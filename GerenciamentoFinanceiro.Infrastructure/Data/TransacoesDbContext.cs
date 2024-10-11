using GerenciamentoFinanceiro.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GerenciamentoFinanceiro.Infrastructure.Data
{
    public class TransacoesDbContext : DbContext
    {
        public TransacoesDbContext(DbContextOptions<TransacoesDbContext> options)
            : base(options)
        {
        }

        public DbSet<Transacao> Transacoes { get; set; }
    }
}
