using GerenciamentoFinanceiro.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GerenciamentoFinanceiro.Domain.Interfaces
{
    public interface IDashboardRepository
    {
        Task<IEnumerable<ReceitaDespesaMensal>> ObterReceitasDespesasPorMes();
    }
}
