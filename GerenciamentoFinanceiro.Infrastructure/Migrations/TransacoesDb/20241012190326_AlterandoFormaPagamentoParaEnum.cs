using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GerenciamentoFinanceiro.Infrastructure.Migrations.TransacoesDb
{
    /// <inheritdoc />
    public partial class AlterandoFormaPagamentoParaEnum : Migration
{
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        // Passo 1: Criar uma nova coluna temporária para armazenar o enum
        migrationBuilder.AddColumn<int>(
            name: "FormaDePagamentoTemp",
            table: "Transacoes",
            type: "integer",
            nullable: false,
            defaultValue: 0);

            // Passo 2: Atualizar a nova coluna com base nos valores de forma_de_pagamento string
            migrationBuilder.Sql(@"
                UPDATE ""Transacoes""
                SET ""FormaDePagamentoTemp"" = 
                CASE 
                    WHEN ""FormaDePagamento"" = 'Cartao' THEN 0
                    WHEN ""FormaDePagamento"" = 'Dinheiro' THEN 1
                    WHEN ""FormaDePagamento"" = 'Transferencia' THEN 2
                    WHEN ""FormaDePagamento"" = 'Pix' THEN 3
                    WHEN ""FormaDePagamento"" = 'Cheque' THEN 4
                    ELSE 0
                END;
            ");

            // Passo 3: Remover a coluna antiga
            migrationBuilder.DropColumn(
            name: "FormaDePagamento",
            table: "Transacoes");

        // Passo 4: Renomear a coluna temporária para o nome original
        migrationBuilder.RenameColumn(
            name: "FormaDePagamentoTemp",
            table: "Transacoes",
            newName: "FormaDePagamento");
    }

    protected override void Down(MigrationBuilder migrationBuilder)
    {
        // Passo inverso para reverter as mudanças caso necessário

        // Criar novamente a coluna como string
        migrationBuilder.AddColumn<string>(
            name: "FormaDePagamento",
            table: "Transacoes",
            type: "text",
            nullable: false,
            defaultValue: "");

        // Reverter os valores para a forma de string
        migrationBuilder.Sql(@"
            UPDATE Transacoes
            SET FormaDePagamento = 
            CASE 
                WHEN FormaDePagamento = 0 THEN 'Cartao'
                WHEN FormaDePagamento = 1 THEN 'Dinheiro'
                WHEN FormaDePagamento = 2 THEN 'Transferencia'
                WHEN FormaDePagamento = 3 THEN 'Pix'
                WHEN FormaDePagamento = 4 THEN 'Cheque'
                ELSE 'Cartao'
            END;
        ");

        // Remover a coluna temporária
        migrationBuilder.DropColumn(
            name: "FormaDePagamentoTemp",
            table: "Transacoes");
    }
}

}
