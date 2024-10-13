using GerenciamentoFinanceiro.Domain.Entities;
using GerenciamentoFinanceiro.Domain.Enums;
using GerenciamentoFinanceiro.Domain.Interfaces;
using GerenciamentoFinanceiro.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GerenciamentoFinanceiro.Infrastructure.Repositories
{
    public class TransacaoRepository : ITransacaoRepository
    {
        private readonly TransacoesDbContext _context;

        public TransacaoRepository(TransacoesDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Transacao>> ObterTransacoes(
            string ordenacaoValor,
            string ordenacaoData,
            string categoria,
            string status,
            int? tipo,
            DateTime? dataInicio,
            DateTime? dataFim,
            int pageNumber,
            int pageSize
        )
        {
            var query = _context.Transacoes.AsQueryable();

            // Filtro por categoria
            if (!string.IsNullOrEmpty(categoria))
            {
                query = query.Where(t => t.Categoria == categoria);
            }

            // Filtro por status
            if (!string.IsNullOrEmpty(status))
            {
                var statusEnum = Enum.Parse<Status>(status);
                query = query.Where(t => t.Status == statusEnum);
            }

            // Filtro por tipo de transação
            if (tipo.HasValue)
            {
                var tipoEnum = (TipoTransacao)tipo.Value;
                query = query.Where(t => t.Tipo == tipoEnum);
            }

            // Filtro por intervalo de datas de vencimento
            if (dataInicio.HasValue)
            {
                query = query.Where(t => t.DataVencimento >= dataInicio.Value);
            }

            if (dataFim.HasValue)
            {
                query = query.Where(t => t.DataVencimento <= dataFim.Value);
            }

            // Ordenação por valor
            if (ordenacaoValor == "crescente")
            {
                query = query.OrderBy(t => t.Valor);
            }
            else if (ordenacaoValor == "decrescente")
            {
                query = query.OrderByDescending(t => t.Valor);
            }

            // Ordenação por data de registro
            if (ordenacaoData == "crescente")
            {
                query = query.OrderBy(t => t.DataRegistro);
            }
            else if (ordenacaoData == "decrescente")
            {
                query = query.OrderByDescending(t => t.DataRegistro);
            }

            // Paginação
            query = query.Skip((pageNumber - 1) * pageSize).Take(pageSize);

            return await query.ToListAsync();
        }

        public async Task<int> ObterTotalTransacoes(
            string ordenacaoValor,
            string ordenacaoData,
            string categoria,
            string status,
            int? tipo,
            DateTime? dataInicio,
            DateTime? dataFim
        )
        {
            var query = _context.Transacoes.AsQueryable();

            // Filtro por categoria
            if (!string.IsNullOrEmpty(categoria))
            {
                query = query.Where(t => t.Categoria == categoria);
            }

            // Filtro por status
            if (!string.IsNullOrEmpty(status))
            {
                var statusEnum = Enum.Parse<Status>(status);
                query = query.Where(t => t.Status == statusEnum);
            }

            // Filtro por tipo de transação
            if (tipo.HasValue)
            {
                var tipoEnum = (TipoTransacao)tipo.Value;
                query = query.Where(t => t.Tipo == tipoEnum);
            }

            // Filtro por intervalo de datas de vencimento
            if (dataInicio.HasValue)
            {
                query = query.Where(t => t.DataVencimento >= dataInicio.Value);
            }

            if (dataFim.HasValue)
            {
                query = query.Where(t => t.DataVencimento <= dataFim.Value);
            }

            // Retorna o número total de transações
            return await query.CountAsync();
        }

        public async Task<IEnumerable<Transacao>> ObterTodasTransacoes()
        {
            return await _context.Transacoes.ToListAsync();
        }

        public async Task AdicionarTransacao(Transacao transacao)
        {
            await _context.Transacoes.AddAsync(transacao);
            await _context.SaveChangesAsync();
        }

        public async Task AtualizarTransacao(Transacao transacao)
        {
            _context.Transacoes.Update(transacao);
            await _context.SaveChangesAsync();
        }

        public async Task RemoverTransacao(int id)
        {
            var transacao = await _context.Transacoes.FindAsync(id);
            if (transacao != null)
            {
                _context.Transacoes.Remove(transacao);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<Transacao> ObterPorId(int id)
        {
            return await _context.Transacoes.FindAsync(id);
        }
    }
}
