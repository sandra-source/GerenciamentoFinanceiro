using GerenciamentoFinanceiro.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GerenciamentoFinanceiro.Infrastructure.Data
{
    public class DespesasDbContext : DbContext
    {
        public DespesasDbContext(DbContextOptions<DespesasDbContext> options)
            : base(options)
        {
        }

        public DbSet<Despesa> Despesas { get; set; }
    }
}
