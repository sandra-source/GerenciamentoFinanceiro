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
    public class DespesaService : IDespesaService
    {
        private readonly IDespesaRepository _despesaRepository;

        public DespesaService(IDespesaRepository despesaRepository)
        {
            _despesaRepository = despesaRepository;
        }

        public async Task<IEnumerable<DespesaDTO>> ObterTodasDespesas()
        {
            var despesas = await _despesaRepository.ObterTodasDespesas();
            return despesas.Select(d => new DespesaDTO
            {
                Id = d.Id,
                Valor = d.Valor,
                Categoria = d.Categoria,
                Descricao = d.Descricao,
                FormaDePagamento = d.FormaDePagamento,
                Origem = d.Origem,
                Natureza = d.Natureza,
                DataEmissao = d.DataEmissao,
                DataVencimento = d.DataVencimento
            }).ToList();
        }

        public async Task AdicionarDespesa(DespesaDTO despesaDTO)
        {
            var despesa = new Despesa
            {
                Valor = despesaDTO.Valor,
                Categoria = despesaDTO.Categoria,
                Descricao = despesaDTO.Descricao,
                FormaDePagamento = despesaDTO.FormaDePagamento,
                Origem = despesaDTO.Origem,
                Natureza = despesaDTO.Natureza,
                DataEmissao = despesaDTO.DataEmissao,
                DataVencimento = despesaDTO.DataVencimento
            };

            await _despesaRepository.AdicionarDespesa(despesa);
        }

        public async Task AtualizarDespesa(DespesaDTO despesaDTO)
        {
            var despesa = await _despesaRepository.ObterPorId(despesaDTO.Id);
            if (despesa != null)
            {
                despesa.Valor = despesaDTO.Valor;
                despesa.Categoria = despesaDTO.Categoria;
                despesa.Descricao = despesaDTO.Descricao;
                despesa.FormaDePagamento = despesaDTO.FormaDePagamento;
                despesa.Origem = despesaDTO.Origem;
                despesa.Natureza = despesaDTO.Natureza;
                despesa.DataEmissao = despesaDTO.DataEmissao;
                despesa.DataVencimento = despesaDTO.DataVencimento;

                await _despesaRepository.AtualizarDespesa(despesa);
            }
        }

        public async Task RemoverDespesa(int id)
        {
            await _despesaRepository.RemoverDespesa(id);
        }

        public async Task<DespesaDTO> ObterPorId(int id)
        {
            var despesa = await _despesaRepository.ObterPorId(id);
            if (despesa == null) return null;

            return new DespesaDTO
            {
                Id = despesa.Id,
                Valor = despesa.Valor,
                Categoria = despesa.Categoria,
                Descricao = despesa.Descricao,
                FormaDePagamento = despesa.FormaDePagamento,
                Origem = despesa.Origem,
                Natureza = despesa.Natureza,
                DataEmissao = despesa.DataEmissao,
                DataVencimento = despesa.DataVencimento
            };
        }
    }
}
