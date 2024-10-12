using GerenciamentoFinanceiro.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GerenciamentoFinanceiro.Domain.Entities
{
    public class Transacao
    {
        public int Id { get; set; }
        public decimal Valor { get; set; }
        public string? Categoria { get; set; }
        public string? Descricao { get; set; }
        public FormaPagamento FormaDePagamento { get; set; }
        public string Origem { get; set; }
        public Natureza Natureza { get; set; }
        public DateTime DataRegistro { get; set; }
        public DateTime? DataVencimento { get; set; }
        public Status Status { get; set; } 
        public TipoTransacao Tipo { get; set; } 
    }
}
