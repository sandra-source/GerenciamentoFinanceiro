using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GerenciamentoFinanceiro.Infrastructure.Migrations.DespesasDb
{
    /// <inheritdoc />
    public partial class AddDescricaoToDespesas : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Descricao",
                table: "Despesas",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Descricao",
                table: "Despesas");
        }
    }
}
