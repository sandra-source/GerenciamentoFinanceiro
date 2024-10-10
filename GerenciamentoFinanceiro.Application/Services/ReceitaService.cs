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
    public class ReceitaService : IReceitaService
    {
        private readonly IReceitaRepository _receitaRepository;

        public ReceitaService(IReceitaRepository receitaRepository)
        {
            _receitaRepository = receitaRepository;
        }

        public async Task<IEnumerable<ReceitaDTO>> ObterReceitas(string ordenacaoValor, string ordenacaoDataRecebimento, string categoria, string status)
        {
            var receitas = await _receitaRepository.ObterReceitas(ordenacaoValor, ordenacaoDataRecebimento, categoria, status);

            return receitas.Select(r => new ReceitaDTO
            {
                Id = r.Id,
                Valor = r.Valor,
                Categoria = r.Categoria,
                FormaDePagamento = r.FormaDePagamento,
                Origem = r.Origem,
                Natureza = r.Natureza,
                DataRecebimento = r.DataRecebimento,
                Status = r.Status
            }).ToList();
        }

        public async Task<ReceitaDTO> ObterPorId(int id)
        {
            var receita = await _receitaRepository.ObterPorId(id);
            if (receita == null) return null;

            return new ReceitaDTO
            {
                Id = receita.Id,
                Valor = receita.Valor,
                Categoria = receita.Categoria,
                FormaDePagamento = receita.FormaDePagamento,
                Origem = receita.Origem,
                Natureza = receita.Natureza,
                DataRecebimento = receita.DataRecebimento
            };
        }

        public async Task AdicionarReceita(ReceitaDTO receitaDTO)
        {
            var receita = new Receita
            {
                Valor = receitaDTO.Valor,
                Categoria = receitaDTO.Categoria,
                Observacao = receitaDTO.Observacao,
                FormaDePagamento = receitaDTO.FormaDePagamento,
                Origem = receitaDTO.Origem,
                Natureza = receitaDTO.Natureza,
                DataRecebimento = receitaDTO.DataRecebimento
            };

            await _receitaRepository.AdicionarReceita(receita);
        }

        public async Task AtualizarReceita(ReceitaDTO receitaDTO)
        {
            var receita = await _receitaRepository.ObterPorId(receitaDTO.Id);
            if (receita != null)
            {
                receita.Valor = receitaDTO.Valor;
                receita.Categoria = receitaDTO.Categoria;
                receita.FormaDePagamento = receitaDTO.FormaDePagamento;
                receita.Origem = receitaDTO.Origem;
                receita.Natureza = receitaDTO.Natureza;
                receita.DataRecebimento = receitaDTO.DataRecebimento;

                await _receitaRepository.AtualizarReceita(receita);
            }
        }

        public async Task RemoverReceita(int id)
        {
            await _receitaRepository.RemoverReceita(id);
        }
    }
}
