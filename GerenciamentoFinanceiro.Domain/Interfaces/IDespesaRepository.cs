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
        Task<IEnumerable<Despesa>> ObterDespesas(string ordenacaoValor, string ordenacaoVencimento, string tipo, string status);
        Task<IEnumerable<Despesa>> ObterTodasDespesas();
        Task AdicionarDespesa(Despesa despesa);
        Task AtualizarDespesa(Despesa despesa);
        Task RemoverDespesa(int id);
        Task<Despesa> ObterPorId(int id);
    }
}
