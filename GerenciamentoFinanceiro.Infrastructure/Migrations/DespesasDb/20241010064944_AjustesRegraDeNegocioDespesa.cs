using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GerenciamentoFinanceiro.Infrastructure.Migrations.DespesasDb
{
    /// <inheritdoc />
    public partial class AjustesRegraDeNegocioDespesa : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Data",
                table: "Despesas",
                newName: "DataRegistro");

            migrationBuilder.AddColumn<int>(
                name: "NaturezaTemp",
                table: "Despesas",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.Sql(
                @"
                UPDATE ""Despesas""
                SET ""NaturezaTemp"" = 0
                WHERE ""Natureza"" IS NOT NULL");

            migrationBuilder.DropColumn(
                name: "Natureza",
                table: "Despesas");

            migrationBuilder.RenameColumn(
                name: "NaturezaTemp",
                table: "Despesas",
                newName: "Natureza");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "DataRegistro",
                table: "Despesas",
                newName: "Data");

            migrationBuilder.AddColumn<string>(
                name: "Natureza",
                table: "Despesas",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.DropColumn(
                name: "Natureza",
                table: "Despesas");

            migrationBuilder.RenameColumn(
                name: "NaturezaTemp",
                table: "Despesas",
                newName: "Natureza");
        }
    }
}
