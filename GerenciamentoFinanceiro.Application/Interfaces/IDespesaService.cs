using GerenciamentoFinanceiro.Application.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GerenciamentoFinanceiro.Application.Interfaces
{
    public interface IDespesaService
    {
        Task<IEnumerable<DespesaDTO>> ObterDespesas(string ordenacaoValor, string ordenacaoVencimento, string tipo, string status);
        Task AdicionarDespesa(DespesaDTO despesaDTO);
        Task AtualizarDespesa(DespesaDTO despesaDTO);
        Task RemoverDespesa(int id);
        Task<DespesaDTO> ObterPorId(int id);
    }
}
