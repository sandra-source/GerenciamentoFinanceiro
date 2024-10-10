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

        public async Task<IEnumerable<Receita>> ObterReceitas(string ordenacaoValor, string ordenacaoDataRecebimento, string categoria, string status)
        {
            var query = _context.Receitas.AsQueryable();

            // Filtrar por categoria, se especificada
            if (!string.IsNullOrEmpty(categoria))
            {
                query = query.Where(r => r.Categoria == categoria);
            }

            // Filtrar por status, se especificado
            if (!string.IsNullOrEmpty(status))
            {
                query = query.Where(r => r.Status.ToString() == status);
            }

            // Ordenar por valor, se especificado
            if (ordenacaoValor == "crescente")
            {
                query = query.OrderBy(r => r.Valor);
            }
            else if (ordenacaoValor == "decrescente")
            {
                query = query.OrderByDescending(r => r.Valor);
            }

            // Ordenar por data de recebimento, se especificado
            if (ordenacaoDataRecebimento == "crescente")
            {
                query = query.OrderBy(r => r.DataRecebimento);
            }
            else if (ordenacaoDataRecebimento == "decrescente")
            {
                query = query.OrderByDescending(r => r.DataRecebimento);
            }

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
