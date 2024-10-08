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
        Usuario GetByEmail(string email);
        Usuario GetByUsername(string username);
        void Add(Usuario usuario);
    }
}
