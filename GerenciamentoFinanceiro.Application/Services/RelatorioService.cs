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
    public class RelatorioService : IRelatorioService
    {
        private readonly IDespesaRepository _despesaRepository;
        private readonly IReceitaRepository _receitaRepository;

        public RelatorioService(IDespesaRepository despesaRepository, IReceitaRepository receitaRepository)
        {
            _despesaRepository = despesaRepository;
            _receitaRepository = receitaRepository;
        }

        public async Task<RelatorioGeradoDTO> GerarRelatorioAsync(DateTime dataInicio, DateTime dataFim, string categoria = null)
        {
            // Esperar os dados de despesas e receitas de forma assíncrona
            var despesas = await _despesaRepository.ObterDespesas(dataInicio, dataFim, categoria);
            var receitas = await _receitaRepository.ObterReceitas(dataInicio, dataFim, categoria);

            // Calcular o total de despesas e receitas
            var totalDespesas = despesas.Sum(d => d.Valor);
            var totalReceitas = receitas.Sum(r => r.Valor);

            // Retornar o DTO do relatório gerado
            return new RelatorioGeradoDTO
            {
                TotalDespesas = totalDespesas,
                TotalReceitas = totalReceitas,
                Saldo = totalReceitas - totalDespesas,
                Despesas = despesas.ToList(),
                Receitas = receitas.ToList()
            };
        }
    }
}
