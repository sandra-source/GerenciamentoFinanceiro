using GerenciamentoFinanceiro.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GerenciamentoFinanceiro.Domain.Interfaces
{
    public interface IDespesaRepository
    {
        Task<IEnumerable<Despesa>> GetAll();
        Task<Despesa> GetById(int id);
        Task Add(Despesa despesa);
        Task Update(Despesa despesa);
        Task Delete(int id);
    }
}
