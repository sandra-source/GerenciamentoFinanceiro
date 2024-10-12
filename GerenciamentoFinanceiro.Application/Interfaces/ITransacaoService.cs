using GerenciamentoFinanceiro.Application.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GerenciamentoFinanceiro.Application.Interfaces
{
    public interface ITransacaoService
    {
        Task<IEnumerable<TransacaoDTO>> ObterTransacoes(string ordenacaoValor, string ordenacaoData, string categoria, string status, int? tipo, DateTime? dataInicio, DateTime? dataFim, int pageNumber, int pageSize);
        Task<int> ObterTotalTransacoes(string ordenacaoValor, string ordenacaoData, string categoria, string status, int? tipo, DateTime? dataInicio, DateTime? dataFim);
        Task<TransacaoDTO> ObterPorId(int id);
        Task AdicionarTransacao(TransacaoDTO transacaoDTO);
        Task AtualizarTransacao(TransacaoDTO transacaoDTO);
        Task RemoverTransacao(int id);
    }
}
