using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GerenciamentoFinanceiro.Infrastructure.Migrations.ReceitasDb
{
    /// <inheritdoc />
    public partial class UpdateReceitasTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Descricao",
                table: "Receitas",
                newName: "Origem");

            migrationBuilder.AddColumn<DateTime>(
                name: "DataRecebimento",
                table: "Receitas",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "FormaDePagamento",
                table: "Receitas",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Natureza",
                table: "Receitas",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Observacao",
                table: "Receitas",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DataRecebimento",
                table: "Receitas");

            migrationBuilder.DropColumn(
                name: "FormaDePagamento",
                table: "Receitas");

            migrationBuilder.DropColumn(
                name: "Natureza",
                table: "Receitas");

            migrationBuilder.DropColumn(
                name: "Observacao",
                table: "Receitas");

            migrationBuilder.RenameColumn(
                name: "Origem",
                table: "Receitas",
                newName: "Descricao");
        }
    }
}
