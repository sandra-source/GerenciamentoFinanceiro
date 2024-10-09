using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GerenciamentoFinanceiro.Application.DTOs
{
    public class ReceitaDTO
    {
        public int Id { get; set; }
        public decimal Valor { get; set; }
        public string Fonte { get; set; }
        public string Observacao { get; set; }
        public string FormaDePagamento { get; set; }
        public string Origem { get; set; }
        public string Natureza { get; set; }
        public DateTime DataRecebimento { get; set; }
    }
}
