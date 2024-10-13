using GerenciamentoFinanceiro.Application.DTOs;
using GerenciamentoFinanceiro.Application.Interfaces;
using GerenciamentoFinanceiro.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
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
    }

}
