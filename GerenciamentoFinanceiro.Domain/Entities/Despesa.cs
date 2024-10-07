using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GerenciamentoFinanceiro.Domain.Entities
{
    public class Despesa
    {
        public int Id { get; set; } 
        public decimal Valor { get; set; } 
        public string Categoria { get; set; } 
        public string Descricao { get; set; } 
        public DateTime Data { get; set; } 
    }
}
