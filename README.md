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

- `dotnet ef database update --context UsuariosDbContext`
-  `dotnet ef database update --context DespesasDbContext`
- `dotnet ef database update --context ReceitasDbContext`

Windows(Visual Studio) (NuGet Package Console):

- `Update-Database -Context UsuariosDbContext`
- `Update-Database -Context DespesasDbContext`
- `Update-Database -Context ReceitasDbContext`
  
Cada DbContext representa um conjunto específico de tabelas e migrações que precisam ser aplicadas separadamente.


