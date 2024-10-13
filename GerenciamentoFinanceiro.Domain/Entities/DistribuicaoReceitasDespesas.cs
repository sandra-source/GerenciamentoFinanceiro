using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GerenciamentoFinanceiro.Domain.Entities
{
    public class DistribuicaoReceitasDespesas
    {
        public int ReceitasPagasAtraso { get; set; }
        public int ReceitasPagasPrazo { get; set; }
        public int DespesasPagasAtraso { get; set; }
        public int DespesasPagasPrazo { get; set; }
    }
}
