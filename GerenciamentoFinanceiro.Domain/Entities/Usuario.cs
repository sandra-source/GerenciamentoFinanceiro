using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GerenciamentoFinanceiro.Domain.Entities
{
    public class Usuario
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Email { get; set; }
        public string SenhaHash { get; set; }  // Para armazenar a senha de forma segura (com hash)
        public string Role { get; set; }  // Se você quiser implementar roles como "Admin", "User", etc.
    }
}
