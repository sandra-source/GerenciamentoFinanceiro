using GerenciamentoFinanceiro.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GerenciamentoFinanceiro.Domain.Interfaces
{
    public interface IReceitaRepository
    {
        Task<IEnumerable<Receita>> GetAll();
        Task<Receita> GetById(int id);
        Task Add(Receita receita);
        Task Update(Receita receita);
        Task Delete(int id);
    }
}
