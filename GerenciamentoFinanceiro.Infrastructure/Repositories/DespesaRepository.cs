using GerenciamentoFinanceiro.Domain.Entities;
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
    public class DespesaRepository : IDespesaRepository
    {
        private readonly DespesasDbContext _context;

        public DespesaRepository(DespesasDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Despesa>> ObterDespesas(DateTime dataInicio, DateTime dataFim, string categoria = null)
        {
            var query = _context.Despesas.AsQueryable();

            if (!string.IsNullOrEmpty(categoria))
            {
                query = query.Where(d => d.Categoria == categoria);
            }

            query = query.Where(d => d.DataVencimento >= dataInicio && d.DataVencimento <= dataFim);

            return await query.ToListAsync();
        }

        public async Task<IEnumerable<Despesa>> ObterTodasDespesas()
        {
            return await _context.Despesas.ToListAsync();
        }

        public async Task AdicionarDespesa(Despesa despesa)
        {
            await _context.Despesas.AddAsync(despesa);
            await _context.SaveChangesAsync();
        }

        public async Task AtualizarDespesa(Despesa despesa)
        {
            _context.Despesas.Update(despesa);
            await _context.SaveChangesAsync();
        }

        public async Task RemoverDespesa(int id)
        {
            var despesa = await _context.Despesas.FindAsync(id);
            if (despesa != null)
            {
                _context.Despesas.Remove(despesa);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<Despesa> ObterPorId(int id)
        {
            return await _context.Despesas.FindAsync(id);
        }
    }
}
