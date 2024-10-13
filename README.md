# Dependências Frontend

npm install

_caso não seja executado, por qualquer erro, basta adicionar `--force` ao comando, e então ele será executado_

# Dependências Backend

Crie o banco de dados manulmente no PostgreSQL com o seguinte comando:

`CREATE DATABASE GerenciamentoFinanceiro;`

No arquivo `appsettings.json`, configure sua string de conexão ao banco de dados, ela deve se parecer com isso:

<pre>{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Port=5432;Database=GerenciamentoFinanceiro;Username=SeuUsuario;Password=SuaSenha"
  }
} </pre>

Substitua "SeuUsuario" pelo seu usuário do PostgreSQL, bem como o "SuaSenha" por sua senha real.

<h2>Criação das tabelas:</h2>

Mac, Linux (CLI):

- Criação da tabela de Usuarios `dotnet ef database update --context UsuariosDbContext`
- Criação da tabela de Despesas `dotnet ef database update --context DespesasDbContext`
- Criação da tabela de Receitas `dotnet ef database update --context ReceitasDbContext`

Windows(Visual Studio) (NuGet Package Console):

- Criação da tabela de Usuarios `Update-Database -Context UsuariosDbContext`
- Criação da tabela de Despesas `Update-Database -Context DespesasDbContext`
- Criação da tabela de Receitas `Update-Database -Context ReceitasDbContext`
  
Cada DbContext representa um conjunto específico de tabelas e migrações que precisam ser aplicadas separadamente.


