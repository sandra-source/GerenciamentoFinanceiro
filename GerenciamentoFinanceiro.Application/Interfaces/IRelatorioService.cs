using GerenciamentoFinanceiro.Application.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GerenciamentoFinanceiro.Application.Interfaces
{
    public interface IRelatorioService
    {
        Task<RelatorioGeradoDTO> GerarRelatorioAsync(DateTime dataInicio, DateTime dataFim, string categoria = null);
    }
}
