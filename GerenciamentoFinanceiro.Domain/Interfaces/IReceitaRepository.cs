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
        Task<IEnumerable<Receita>> ObterReceitas(string ordenacaoValor, string ordenacaoDataRecebimento, string categoria, string status);
        Task<IEnumerable<Receita>> ObterTodasReceitas();
        Task<Receita> ObterPorId(int id);
        Task AdicionarReceita(Receita receita);
        Task AtualizarReceita(Receita receita);
        Task RemoverReceita(int id);
    }
}
