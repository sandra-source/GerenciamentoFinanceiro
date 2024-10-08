using GerenciamentoFinanceiro.Domain.Entities;
using GerenciamentoFinanceiro.Domain.Interfaces;
using GerenciamentoFinanceiro.Infrastructure.Data;
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

        public void Add(Usuario usuario)
        {
            _context.Usuarios.Add(usuario);
            _context.SaveChanges(); 
        }

        public Usuario GetByEmail(string email)
        {
            return _context.Usuarios.SingleOrDefault(u => u.Email == email);
        }
        
        public Usuario GetByUsername(string username)
        {
            return _context.Usuarios.SingleOrDefault(u => u.Nome == username);
        }
    }
}
