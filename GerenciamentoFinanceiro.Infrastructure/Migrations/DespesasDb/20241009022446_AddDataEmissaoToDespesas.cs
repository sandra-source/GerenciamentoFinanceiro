using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GerenciamentoFinanceiro.Infrastructure.Migrations.DespesasDb
{
    /// <inheritdoc />
    public partial class AddDataEmissaoToDespesas : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Descricao",
                table: "Despesas",
                newName: "Origem");

            migrationBuilder.AddColumn<DateTime>(
                name: "DataEmissao",
                table: "Despesas",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "DataVencimento",
                table: "Despesas",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "FormaDePagamento",
                table: "Despesas",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Natureza",
                table: "Despesas",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DataEmissao",
                table: "Despesas");

            migrationBuilder.DropColumn(
                name: "DataVencimento",
                table: "Despesas");

            migrationBuilder.DropColumn(
                name: "FormaDePagamento",
                table: "Despesas");

            migrationBuilder.DropColumn(
                name: "Natureza",
                table: "Despesas");

            migrationBuilder.RenameColumn(
                name: "Origem",
                table: "Despesas",
                newName: "Descricao");
        }
    }
}
