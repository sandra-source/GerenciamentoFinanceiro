﻿using GerenciamentoFinanceiro.Application.DTOs;
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
        Task<Usuario> Autenticar(string username, string password);
        Task CriarNovoUsuario(UsuarioDTO novoUsuario);
    }
}
