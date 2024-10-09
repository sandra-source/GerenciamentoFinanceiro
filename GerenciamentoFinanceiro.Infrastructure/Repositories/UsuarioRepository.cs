using GerenciamentoFinanceiro.Domain.Entities;
using GerenciamentoFinanceiro.Domain.Interfaces;
using GerenciamentoFinanceiro.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GerenciamentoFinanceiro.Infrastructure.Repositories
{
    public class UsuarioRepository : IUsuarioRepository
    {
        private readonly UsuariosDbContext _context;

        public UsuarioRepository(UsuariosDbContext context)
        {
            _context = context;
        }

        public async Task AdicionarUsuario(Usuario usuario)
        {
            await _context.Usuarios.AddAsync(usuario);
            await _context.SaveChangesAsync();
        }

        public async Task<Usuario> ObterPorEmail(string email)
        {
            return await _context.Usuarios.SingleOrDefaultAsync(u => u.Email == email);
        }

        public async Task<Usuario> ObterPorNome(string username)
        {
            return await _context.Usuarios.SingleOrDefaultAsync(u => u.Nome == username);
        }
    }
}
