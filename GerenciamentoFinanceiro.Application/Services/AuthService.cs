using GerenciamentoFinanceiro.Application.DTOs;
using GerenciamentoFinanceiro.Application.Interfaces;
using GerenciamentoFinanceiro.Domain.Entities;
using GerenciamentoFinanceiro.Domain.Interfaces;
using Org.BouncyCastle.Crypto.Generators;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GerenciamentoFinanceiro.Application.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUsuarioRepository _usuarioRepository;

        public AuthService(IUsuarioRepository usuarioRepository)
        {
            _usuarioRepository = usuarioRepository;
        }

        public void CriarNovoUsuario(UsuarioDTO novoUsuario)
        {
            var usuarioExistente = _usuarioRepository.GetByUsername(novoUsuario.Email);
            if (usuarioExistente != null)
            {
                throw new Exception("Usuário com este email já existe.");
            }

            var passwordHash = BCrypt.Net.BCrypt.HashPassword(novoUsuario.Senha);

            var usuario = new Usuario
            {
                Nome = novoUsuario.Nome,
                Email = novoUsuario.Email,
                SenhaHash = passwordHash,
                Role = novoUsuario.Role ?? "User" 
            };

            _usuarioRepository.Add(usuario);
        }

        public Usuario Autenticar(string email, string password)
        {
            var user = _usuarioRepository.GetByEmail(email);

            if (user == null || !BCrypt.Net.BCrypt.Verify(password, user.SenhaHash))
            {
                return null;  // Usuário ou senha inválidos
            }

            return user;  // Retornar o usuário se a autenticação foi bem-sucedida
        }
    }
}
