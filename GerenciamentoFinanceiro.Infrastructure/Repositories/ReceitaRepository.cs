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
    public class ReceitaRepository : IReceitaRepository
    {
        private readonly ReceitasDbContext _context;

        public ReceitaRepository(ReceitasDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Receita>> ObterReceitas(DateTime dataInicio, DateTime dataFim, string categoria = null)
        {
            var query = _context.Receitas.AsQueryable();

            if (!string.IsNullOrEmpty(categoria))
            {
                query = query.Where(r => r.Fonte == categoria);
            }

            query = query.Where(r => r.DataRecebimento >= dataInicio && r.DataRecebimento <= dataFim);

            return await query.ToListAsync();
        }

        public async Task<IEnumerable<Receita>> ObterTodasReceitas()
        {
            return await _context.Receitas.ToListAsync();
        }

        public async Task AdicionarReceita(Receita receita)
        {
            await _context.Receitas.AddAsync(receita);
            await _context.SaveChangesAsync();
        }

        public async Task AtualizarReceita(Receita receita)
        {
            _context.Receitas.Update(receita);
            await _context.SaveChangesAsync();
        }

        public async Task RemoverReceita(int id)
        {
            var receita = await _context.Receitas.FindAsync(id);
            if (receita != null)
            {
                _context.Receitas.Remove(receita);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<Receita> ObterPorId(int id)
        {
            return await _context.Receitas.FindAsync(id);
        }
    }
}
