using GerenciamentoFinanceiro.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GerenciamentoFinanceiro.Domain.Interfaces
{
    public interface IUsuarioRepository
    {
        Task<Usuario> ObterPorEmail(string email);
        Task<Usuario> ObterPorNome(string username);
        Task AdicionarUsuario(Usuario usuario);
    }
}
