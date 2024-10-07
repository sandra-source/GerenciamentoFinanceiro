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
        private readonly ApplicationDbContext _context;

        public DespesaRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Despesa>> GetAll()
        {
            return await _context.Despesas.ToListAsync();
        }

        public async Task<Despesa> GetById(int id)
        {
            return await _context.Despesas.FindAsync(id);
        }

        public async Task Add(Despesa despesa)
        {
            _context.Despesas.Add(despesa);
            await _context.SaveChangesAsync();
        }

        public async Task Update(Despesa despesa)
        {
            _context.Entry(despesa).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task Delete(int id)
        {
            var despesa = await _context.Despesas.FindAsync(id);
            if (despesa != null)
            {
                _context.Despesas.Remove(despesa);
                await _context.SaveChangesAsync();
            }
        }
    }
}
