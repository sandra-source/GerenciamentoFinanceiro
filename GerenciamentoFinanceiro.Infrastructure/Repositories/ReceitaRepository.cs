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
        private readonly ApplicationDbContext _context;

        public ReceitaRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Receita>> GetAll()
        {
            return await _context.Receitas.ToListAsync();
        }

        public async Task<Receita> GetById(int id)
        {
            return await _context.Receitas.FindAsync(id);
        }

        public async Task Add(Receita receita)
        {
            _context.Receitas.Add(receita);
            await _context.SaveChangesAsync();
        }

        public async Task Update(Receita receita)
        {
            _context.Entry(receita).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task Delete(int id)
        {
            var receita = await _context.Receitas.FindAsync(id);
            if (receita != null)
            {
                _context.Receitas.Remove(receita);
                await _context.SaveChangesAsync();
            }
        }
    }
}
