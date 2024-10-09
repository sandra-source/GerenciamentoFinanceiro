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
        public string Categoria { get; set; } // Exemplo: mercado, contas
        public string Descricao { get; set; }
        public string FormaDePagamento { get; set; } // Exemplo: cartão, boleto, transferência
        public string Origem { get; set; } // Exemplo: supermercado, concessionária
        public string Natureza { get; set; } // Exemplo: alimentação, energia, transporte
        public DateTime DataEmissao { get; set; } // Quando foi emitida
        public DateTime DataVencimento { get; set; } // Quando deve ser paga
        public DateTime Data { get; set; }
    }
}
