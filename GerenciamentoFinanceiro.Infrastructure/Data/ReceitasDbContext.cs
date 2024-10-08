using GerenciamentoFinanceiro.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GerenciamentoFinanceiro.Infrastructure.Data
{
    public class ReceitasDbContext : DbContext
    {
        public ReceitasDbContext(DbContextOptions<ReceitasDbContext> options)
            : base(options) 
        { 
        }

        public DbSet<Receita> Receitas { get; set; }
    }
}
