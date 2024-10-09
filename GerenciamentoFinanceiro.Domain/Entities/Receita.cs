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
        public string Fonte { get; set; } // Exemplo: salário, venda
        public string FormaDePagamento { get; set; } // Exemplo: cartão, boleto, transferência
        public string Origem { get; set; } // Exemplo: empresa X
        public string Natureza { get; set; } // Exemplo: recorrente, extraordinária
        public string Observacao { get; set; } // Observações adicionais
        public DateTime DataRecebimento { get; set; } // Quando o valor foi/será recebido
        public DateTime Data { get; set; } // Data de registro da receita
    }
}
