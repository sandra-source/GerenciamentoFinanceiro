using GerenciamentoFinanceiro.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GerenciamentoFinanceiro.Application.DTOs
{
    public class DespesaDTO
    {
        public int Id { get; set; }
        public decimal Valor { get; set; }
        public string Categoria { get; set; }
        public string Descricao { get; set; }
        public string FormaDePagamento { get; set; }
        public string Origem { get; set; }
        public string Natureza { get; set; }
        public DateTime DataEmissao { get; set; }
        public DateTime DataVencimento { get; set; }
        public DateTime Data { get; set; }
        public StatusDespesa Status { get; set; }
    }
}
