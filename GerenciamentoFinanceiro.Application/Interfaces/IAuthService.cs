using GerenciamentoFinanceiro.Application.DTOs;
using GerenciamentoFinanceiro.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GerenciamentoFinanceiro.Application.Interfaces
{
    public interface IAuthService
    {
        Usuario Autenticar(string username, string password);
        void CriarNovoUsuario(UsuarioDTO novoUsuario);
    }
}
