using GerenciamentoFinanceiro.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GerenciamentoFinanceiro.Application.DTOs
{
    public class RelatorioGeradoDTO
    {
        public decimal TotalDespesas { get; set; }
        public decimal TotalReceitas { get; set; }
        public decimal Saldo { get; set; }
        public IEnumerable<Despesa> Despesas { get; set; }
        public IEnumerable<Receita> Receitas { get; set; }
    }
}
