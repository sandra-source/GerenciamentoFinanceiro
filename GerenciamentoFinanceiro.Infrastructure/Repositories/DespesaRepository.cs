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

        public async Task<IEnumerable<Despesa>> ObterDespesas(string ordenacaoValor, string ordenacaoVencimento, string tipo, string status)
        {
            var query = _context.Despesas.AsQueryable();

            // Filtros
            if (!string.IsNullOrEmpty(tipo))
            {
                query = query.Where(d => d.Categoria == tipo);
            }

            //if (!string.IsNullOrEmpty(status))
            //{
            //    query = query.Where(d => d.Status == status);
            //}

            // Ordenação por valor
            if (ordenacaoValor == "crescente")
            {
                query = query.OrderBy(d => d.Valor);
            }
            else if (ordenacaoValor == "decrescente")
            {
                query = query.OrderByDescending(d => d.Valor);
            }

            // Ordenação por vencimento
            if (ordenacaoVencimento == "crescente")
            {
                query = query.OrderBy(d => d.DataVencimento);
            }
            else if (ordenacaoVencimento == "decrescente")
            {
                query = query.OrderByDescending(d => d.DataVencimento);
            }

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
