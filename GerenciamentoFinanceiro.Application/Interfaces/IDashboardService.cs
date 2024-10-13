using GerenciamentoFinanceiro.Application.DTOs;
using GerenciamentoFinanceiro.Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GerenciamentoFinanceiro.Application.Interfaces
{
    public interface IDashboardService
    {
        Task<IEnumerable<ReceitaDespesaPorMesDTO>> ObterReceitasDespesasPorMes();
        Task<DistribuicaoReceitasDespesas> ObterDistribuicaoReceitasDespesas();
        Task<ReceitasDespesasPagasPorMes> ObterReceitasDespesasPagasPorMes();
    }
}
