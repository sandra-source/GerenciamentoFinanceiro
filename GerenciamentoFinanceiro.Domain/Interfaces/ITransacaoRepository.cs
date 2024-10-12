using GerenciamentoFinanceiro.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GerenciamentoFinanceiro.Domain.Interfaces
{
    public interface ITransacaoRepository
    {
        Task<IEnumerable<Transacao>> ObterTransacoes(string ordenacaoValor, string ordenacaoData, string categoria, string status, int? tipo, DateTime? dataInicio, DateTime? dataFim);
        Task<IEnumerable<Transacao>> ObterTodasTransacoes();
        Task AdicionarTransacao(Transacao transacao);
        Task AtualizarTransacao(Transacao transacao);
        Task RemoverTransacao(int id);
        Task<Transacao> ObterPorId(int id);
    }
}
