using GerenciamentoFinanceiro.Domain.Entities;
using GerenciamentoFinanceiro.Domain.Enums;
using GerenciamentoFinanceiro.Domain.Interfaces;
using GerenciamentoFinanceiro.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GerenciamentoFinanceiro.Infrastructure.Repositories
{
    public class DashboardRepository : IDashboardRepository
    {
        private readonly TransacoesDbContext _context;

        public DashboardRepository(TransacoesDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<ReceitaDespesaMensal>> ObterReceitasDespesasPorMes()
        {
            int anoAtual = DateTime.Now.Year;

            var receitasDespesas = await _context.Transacoes
                .Where(t => t.DataPagamento.HasValue && t.DataPagamento.Value.Year == anoAtual)
                .GroupBy(t => new { Ano = t.DataPagamento.Value.Year, Mes = t.DataPagamento.Value.Month })
                .Select(g => new ReceitaDespesaMensal
                {
                    Ano = g.Key.Ano,
                    Mes = g.Key.Mes,
                    TotalReceitas = g.Where(t => t.Tipo == TipoTransacao.Receita).Sum(t => t.Valor),
                    TotalDespesas = g.Where(t => t.Tipo == TipoTransacao.Despesa).Sum(t => t.Valor)
                })
                .ToListAsync();

            var resultadoFinal = new List<ReceitaDespesaMensal>();

            for (int mes = 1; mes <= 12; mes++)
            {
                var dadosMes = receitasDespesas.FirstOrDefault(rd => rd.Mes == mes);
                if (dadosMes != null)
                {
                    resultadoFinal.Add(dadosMes);
                }
                else
                {
                    resultadoFinal.Add(new ReceitaDespesaMensal
                    {
                        Ano = anoAtual,
                        Mes = mes,
                        TotalReceitas = 0,
                        TotalDespesas = 0
                    });
                }
            }

            return resultadoFinal;
        }

        public async Task<DistribuicaoReceitasDespesas> ObterDistribuicaoReceitasDespesas()
        {
            var receitasPagasAtraso = await _context.Transacoes
                .Where(t => t.Tipo == TipoTransacao.Receita && t.Status == Status.Pago && t.DataPagamento > t.DataVencimento)
                .CountAsync();

            var receitasPagasPrazo = await _context.Transacoes
                .Where(t => t.Tipo == TipoTransacao.Receita && t.Status == Status.Pago && t.DataPagamento <= t.DataVencimento)
                .CountAsync();

            var despesasPagasAtraso = await _context.Transacoes
                .Where(t => t.Tipo == TipoTransacao.Despesa && t.Status == Status.Pago && t.DataPagamento > t.DataVencimento)
                .CountAsync();

            var despesasPagasPrazo = await _context.Transacoes
                .Where(t => t.Tipo == TipoTransacao.Despesa && t.Status == Status.Pago && t.DataPagamento <= t.DataVencimento)
                .CountAsync();

            return new DistribuicaoReceitasDespesas
            {
                ReceitasPagasAtraso = receitasPagasAtraso,
                ReceitasPagasPrazo = receitasPagasPrazo,
                DespesasPagasAtraso = despesasPagasAtraso,
                DespesasPagasPrazo = despesasPagasPrazo
            };
        }

        public async Task<ReceitasDespesasPagasPorMes> ObterReceitasDespesasPagasPorMes()
        {
            int anoAtual = DateTime.Now.Year;

            // Receitas pagas no prazo
            var receitasPagasNoPrazo = await _context.Transacoes
                .Where(t => t.Tipo == TipoTransacao.Receita
                    && t.Status == Status.Pago
                    && t.DataPagamento.HasValue
                    && t.DataPagamento.Value.Year == anoAtual
                    && t.DataPagamento.Value <= t.DataVencimento)  // Pagas no prazo
                .GroupBy(t => t.DataPagamento.Value.Month)
                .Select(g => new { Mes = g.Key, Quantidade = g.Count() })
                .ToDictionaryAsync(g => g.Mes, g => g.Quantidade);

            // Despesas pagas no prazo
            var despesasPagasNoPrazo = await _context.Transacoes
                .Where(t => t.Tipo == TipoTransacao.Despesa
                    && t.Status == Status.Pago
                    && t.DataPagamento.HasValue
                    && t.DataPagamento.Value.Year == anoAtual
                    && t.DataPagamento.Value <= t.DataVencimento)  // Pagas no prazo
                .GroupBy(t => t.DataPagamento.Value.Month)
                .Select(g => new { Mes = g.Key, Quantidade = g.Count() })
                .ToDictionaryAsync(g => g.Mes, g => g.Quantidade);

            // Receitas pagas após o vencimento
            var receitasPagasAposVencimento = await _context.Transacoes
                .Where(t => t.Tipo == TipoTransacao.Receita
                    && t.Status == Status.Pago
                    && t.DataPagamento.HasValue
                    && t.DataPagamento.Value.Year == anoAtual
                    && t.DataPagamento.Value > t.DataVencimento)  // Pagas após vencimento
                .GroupBy(t => t.DataPagamento.Value.Month)
                .Select(g => new { Mes = g.Key, Quantidade = g.Count() })
                .ToDictionaryAsync(g => g.Mes, g => g.Quantidade);

            // Despesas pagas após o vencimento
            var despesasPagasAposVencimento = await _context.Transacoes
                .Where(t => t.Tipo == TipoTransacao.Despesa
                    && t.Status == Status.Pago
                    && t.DataPagamento.HasValue
                    && t.DataPagamento.Value.Year == anoAtual
                    && t.DataPagamento.Value > t.DataVencimento)  // Pagas após vencimento
                .GroupBy(t => t.DataPagamento.Value.Month)
                .Select(g => new { Mes = g.Key, Quantidade = g.Count() })
                .ToDictionaryAsync(g => g.Mes, g => g.Quantidade);

            // Garantir que todos os meses de janeiro a dezembro estejam representados
            var receitasNoPrazoPorMes = new int[12];
            var despesasNoPrazoPorMes = new int[12];
            var receitasAtrasadasPorMes = new int[12];
            var despesasAtrasadasPorMes = new int[12];

            for (int mes = 1; mes <= 12; mes++)
            {
                receitasNoPrazoPorMes[mes - 1] = receitasPagasNoPrazo.ContainsKey(mes) ? receitasPagasNoPrazo[mes] : 0;
                despesasNoPrazoPorMes[mes - 1] = despesasPagasNoPrazo.ContainsKey(mes) ? despesasPagasNoPrazo[mes] : 0;
                receitasAtrasadasPorMes[mes - 1] = receitasPagasAposVencimento.ContainsKey(mes) ? receitasPagasAposVencimento[mes] : 0;
                despesasAtrasadasPorMes[mes - 1] = despesasPagasAposVencimento.ContainsKey(mes) ? despesasPagasAposVencimento[mes] : 0;
            }

            return new ReceitasDespesasPagasPorMes
            {
                ReceitasPagasNoPrazo = receitasNoPrazoPorMes,
                DespesasPagasNoPrazo = despesasNoPrazoPorMes,
                ReceitasPagasAposVencimento = receitasAtrasadasPorMes,
                DespesasPagasAposVencimento = despesasAtrasadasPorMes
            };
        }

    }
}
