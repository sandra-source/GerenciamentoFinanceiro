using GerenciamentoFinanceiro.Domain.Entities;
using GerenciamentoFinanceiro.Domain.Enums;
using GerenciamentoFinanceiro.Domain.Interfaces;
using GerenciamentoFinanceiro.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
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

            // Busca as transações apenas do ano atual
            var receitasDespesas = await _context.Transacoes
                .Where(t => t.DataVencimento.HasValue && t.DataVencimento.Value.Year == anoAtual)
                .GroupBy(t => new { Ano = t.DataVencimento.Value.Year, Mes = t.DataVencimento.Value.Month })
                .Select(g => new ReceitaDespesaMensal
                {
                    Ano = g.Key.Ano,
                    Mes = g.Key.Mes,
                    TotalReceitas = g.Where(t => t.Tipo == TipoTransacao.Receita).Sum(t => t.Valor),
                    TotalDespesas = g.Where(t => t.Tipo == TipoTransacao.Despesa).Sum(t => t.Valor)
                })
                .ToListAsync();

            // Garante que todos os meses de janeiro a dezembro estejam presentes
            var resultadoFinal = new List<ReceitaDespesaMensal>();

            for (int mes = 1; mes <= 12; mes++)
            {
                // Procura se já temos dados para este mês no ano atual
                var dadosMes = receitasDespesas.FirstOrDefault(rd => rd.Mes == mes);
                if (dadosMes != null)
                {
                    resultadoFinal.Add(dadosMes);
                }
                else
                {
                    // Se não houver dados para o mês, adiciona um registro com receitas e despesas zeradas
                    resultadoFinal.Add(new ReceitaDespesaMensal
                    {
                        Ano = anoAtual,  // Sempre o ano atual
                        Mes = mes,       // Mês corrente
                        TotalReceitas = 0,
                        TotalDespesas = 0
                    });
                }
            }

            return resultadoFinal;
        }


    }

}
