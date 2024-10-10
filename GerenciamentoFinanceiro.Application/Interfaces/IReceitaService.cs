using GerenciamentoFinanceiro.Application.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GerenciamentoFinanceiro.Application.Interfaces
{
    public interface IReceitaService
    {
        Task<IEnumerable<ReceitaDTO>> ObterReceitas(string ordenacaoValor, string ordenacaoDataRecebimento, string categoria, string status);
        Task<ReceitaDTO> ObterPorId(int id);
        Task AdicionarReceita(ReceitaDTO receitaDTO);
        Task AtualizarReceita(ReceitaDTO receitaDTO);
        Task RemoverReceita(int id);
    }
}
