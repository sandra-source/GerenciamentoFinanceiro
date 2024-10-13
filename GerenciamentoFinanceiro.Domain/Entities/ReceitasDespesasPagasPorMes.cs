using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GerenciamentoFinanceiro.Domain.Entities
{
    public class ReceitasDespesasPagasPorMes
    {
        public int[] ReceitasPagasNoPrazo { get; set; }
        public int[] DespesasPagasNoPrazo { get; set; }
        public int[] ReceitasPagasAposVencimento { get; set; }
        public int[] DespesasPagasAposVencimento { get; set; }
    }

}
