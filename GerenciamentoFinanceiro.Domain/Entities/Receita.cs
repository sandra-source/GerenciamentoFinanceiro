using GerenciamentoFinanceiro.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GerenciamentoFinanceiro.Domain.Entities
{
    public class Receita
    {
        public int Id { get; set; }
        public decimal Valor { get; set; }
        public string Categoria { get; set; }
        public string Descricao { get; set; }
        public string FormaDePagamento { get; set; } 
        public string Origem { get; set; } 
        public NaturezaEnum Natureza { get; set; } 
        public string Observacao { get; set; }
        public DateTime DataRecebimento { get; set; } 
        public DateTime DataRegistro { get; set; } 
        public StatusReceitaEnum Status { get; set; }
    }
}
