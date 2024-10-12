using GerenciamentoFinanceiro.Application.DTOs;
using GerenciamentoFinanceiro.Application.Interfaces;
using GerenciamentoFinanceiro.Domain.Entities;
using GerenciamentoFinanceiro.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GerenciamentoFinanceiro.Application.Services
{
    public class TransacaoService : ITransacaoService
    {
        private readonly ITransacaoRepository _transacaoRepository;

        public TransacaoService(ITransacaoRepository transacaoRepository)
        {
            _transacaoRepository = transacaoRepository;
        }

        public async Task<IEnumerable<TransacaoDTO>> ObterTransacoes(
        string ordenacaoValor,
        string ordenacaoData,
        string categoria,
        string status,
        int? tipo,
        DateTime? dataInicio,
        DateTime? dataFim
        )
        {
            var transacoes = await _transacaoRepository.ObterTransacoes(ordenacaoValor, ordenacaoData, categoria, status, tipo, dataInicio, dataFim);

            return transacoes.Select(t => new TransacaoDTO
            {
                Id = t.Id,
                Valor = t.Valor,
                Descricao = t.Descricao,
                Categoria = t.Categoria,
                FormaDePagamento = t.FormaDePagamento,
                Origem = t.Origem,
                Natureza = t.Natureza,
                DataRegistro = t.DataRegistro,
                DataVencimento = t.DataVencimento,
                Status = t.Status,
                Tipo = t.Tipo
            }).ToList();
        }



        public async Task<TransacaoDTO> ObterPorId(int id)
        {
            var transacao = await _transacaoRepository.ObterPorId(id);
            if (transacao == null) return null;

            return new TransacaoDTO
            {
                Id = transacao.Id,
                Valor = transacao.Valor,
                Descricao = transacao.Descricao,
                Categoria = transacao.Categoria,
                FormaDePagamento = transacao.FormaDePagamento,
                Origem = transacao.Origem,
                Natureza = transacao.Natureza,
                DataRegistro = transacao.DataRegistro,
                DataVencimento = transacao.DataVencimento,
                Status = transacao.Status,
                Tipo = transacao.Tipo
            };
        }

        public async Task AdicionarTransacao(TransacaoDTO transacaoDTO)
        {
            var transacao = new Transacao
            {
                Valor = transacaoDTO.Valor,
                Descricao = transacaoDTO.Descricao,
                Categoria = transacaoDTO.Categoria,
                FormaDePagamento = transacaoDTO.FormaDePagamento,
                Origem = transacaoDTO.Origem,
                Natureza = transacaoDTO.Natureza,
                DataRegistro = transacaoDTO.DataRegistro,
                DataVencimento = transacaoDTO.DataVencimento,
                Tipo = transacaoDTO.Tipo,
                Status = transacaoDTO.Status
            };

            await _transacaoRepository.AdicionarTransacao(transacao);
        }

        public async Task AtualizarTransacao(TransacaoDTO transacaoDTO)
        {
            var transacao = await _transacaoRepository.ObterPorId(transacaoDTO.Id);
            if (transacao != null)
            {
                transacao.Valor = transacaoDTO.Valor;
                transacao.Descricao = transacaoDTO.Descricao;
                transacao.Categoria = transacaoDTO.Categoria;
                transacao.FormaDePagamento = transacaoDTO.FormaDePagamento;
                transacao.Origem = transacaoDTO.Origem;
                transacao.Natureza = transacaoDTO.Natureza;
                transacao.DataRegistro = transacaoDTO.DataRegistro;
                transacao.DataVencimento = transacaoDTO.DataVencimento;
                transacao.Status = transacaoDTO.Status;
                transacao.Tipo = transacaoDTO.Tipo;

                await _transacaoRepository.AtualizarTransacao(transacao);
            }
        }

        public async Task RemoverTransacao(int id)
        {
            await _transacaoRepository.RemoverTransacao(id);
        }
    }
}
