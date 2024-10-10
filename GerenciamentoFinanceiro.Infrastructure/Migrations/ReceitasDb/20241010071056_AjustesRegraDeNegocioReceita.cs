using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GerenciamentoFinanceiro.Infrastructure.Migrations.ReceitasDb
{
    /// <inheritdoc />
    public partial class AjustesRegraDeNegocioReceita : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Fonte",
                table: "Receitas",
                newName: "Descricao");

            migrationBuilder.RenameColumn(
                name: "Data",
                table: "Receitas",
                newName: "DataRegistro");

            migrationBuilder.AddColumn<int>(
                name: "NaturezaTemp",
                table: "Receitas",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.Sql(
                @"
                UPDATE ""Receitas""
                SET ""NaturezaTemp"" = 
                    CASE 
                        WHEN ""Natureza"" = 'Recorrente' THEN 1
                        WHEN ""Natureza"" = 'Extraordinaria' THEN 2
                        -- Adicione mais mapeamentos conforme necessário
                        ELSE 0 -- Valor padrão caso não corresponda a nenhum valor esperado
                    END");

            migrationBuilder.DropColumn(
                name: "Natureza",
                table: "Receitas");

            migrationBuilder.RenameColumn(
                name: "NaturezaTemp",
                table: "Receitas",
                newName: "Natureza");

            migrationBuilder.AddColumn<string>(
                name: "Categoria",
                table: "Receitas",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "Receitas",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Categoria",
                table: "Receitas");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "Receitas");

            migrationBuilder.RenameColumn(
                name: "Descricao",
                table: "Receitas",
                newName: "Fonte");

            migrationBuilder.RenameColumn(
                name: "DataRegistro",
                table: "Receitas",
                newName: "Data");

            migrationBuilder.AddColumn<string>(
                name: "Natureza",
                table: "Receitas",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.Sql(
                @"
                UPDATE ""Receitas""
                SET ""Natureza"" = 
                    CASE 
                        WHEN ""NaturezaTemp"" = 1 THEN 'Recorrente'
                        WHEN ""NaturezaTemp"" = 2 THEN 'Extraordinaria'
                        -- Adicione mais mapeamentos conforme necessário
                        ELSE 'Outro'
                    END");

            migrationBuilder.DropColumn(
                name: "Natureza",
                table: "Receitas");
        }
    }
}
