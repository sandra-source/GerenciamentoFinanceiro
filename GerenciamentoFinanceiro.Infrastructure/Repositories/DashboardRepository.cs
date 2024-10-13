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
            return await _context.Transacoes
                .Where(t => t.DataVencimento.HasValue)
                .GroupBy(t => new { Ano = t.DataVencimento.Value.Year, Mes = t.DataVencimento.Value.Month })
                .Select(g => new ReceitaDespesaMensal
                {
                    Ano = g.Key.Ano,
                    Mes = g.Key.Mes,
                    TotalReceitas = g.Where(t => t.Tipo == TipoTransacao.Receita).Sum(t => t.Valor),
                    TotalDespesas = g.Where(t => t.Tipo == TipoTransacao.Despesa).Sum(t => t.Valor)
                })
                .ToListAsync();
        }
    }

}
