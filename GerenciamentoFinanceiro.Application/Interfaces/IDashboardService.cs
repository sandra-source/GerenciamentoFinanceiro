using GerenciamentoFinanceiro.Application.DTOs;
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
    }
}
