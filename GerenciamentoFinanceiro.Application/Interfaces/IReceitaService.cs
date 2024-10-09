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
        Task<IEnumerable<ReceitaDTO>> ObterTodasReceitas();
        Task<ReceitaDTO> ObterPorId(int id);
        Task AdicionarReceita(ReceitaDTO receitaDTO);
        Task AtualizarReceita(ReceitaDTO receitaDTO);
        Task RemoverReceita(int id);
    }
}
