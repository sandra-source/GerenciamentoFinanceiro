using GerenciamentoFinanceiro.Application.DTOs;
using GerenciamentoFinanceiro.Application.Interfaces;
using GerenciamentoFinanceiro.Domain.Entities;
using GerenciamentoFinanceiro.Domain.Interfaces;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GerenciamentoFinanceiro.Application.Services
{
    public class DashboardService : IDashboardService
    {
        private readonly IDashboardRepository _dashboardRepository;

        public DashboardService(IDashboardRepository dashboardRepository)
        {
            _dashboardRepository = dashboardRepository;
        }

        public async Task<IEnumerable<ReceitaDespesaPorMesDTO>> ObterReceitasDespesasPorMes()
        {
            var receitasDespesas = await _dashboardRepository.ObterReceitasDespesasPorMes();

            var receitasDespesasDTO = receitasDespesas.Select(rd => new ReceitaDespesaPorMesDTO
            {
                Ano = rd.Ano,
                Mes = rd.Mes,
                TotalReceitas = rd.TotalReceitas,
                TotalDespesas = rd.TotalDespesas
            });

            return receitasDespesasDTO;
        }

        public async Task<DistribuicaoReceitasDespesas> ObterDistribuicaoReceitasDespesas()
        {
            var distribuicao = await _dashboardRepository.ObterDistribuicaoReceitasDespesas();
            return distribuicao;
        }

        public async Task<ReceitasDespesasPagasPorMes> ObterReceitasDespesasPagasPorMes()
        {
            var receitasDespesasPagas = await _dashboardRepository.ObterReceitasDespesasPagasPorMes();

            return new ReceitasDespesasPagasPorMes
            {
                ReceitasPagasNoPrazo = receitasDespesasPagas.ReceitasPagasNoPrazo,
                DespesasPagasNoPrazo = receitasDespesasPagas.DespesasPagasNoPrazo,
                ReceitasPagasAposVencimento = receitasDespesasPagas.ReceitasPagasAposVencimento,
                DespesasPagasAposVencimento = receitasDespesasPagas.DespesasPagasAposVencimento
            };
        }

    }
}
