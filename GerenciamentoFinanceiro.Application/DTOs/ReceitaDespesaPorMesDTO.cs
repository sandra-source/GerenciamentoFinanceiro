using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GerenciamentoFinanceiro.Application.DTOs
{
    public class ReceitaDespesaPorMesDTO
    {
        public int Ano { get; set; }  
        public int Mes { get; set; }  
        public decimal TotalReceitas { get; set; } 
        public decimal TotalDespesas { get; set; }
    }
}
