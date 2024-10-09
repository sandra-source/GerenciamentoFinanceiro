# Dependências Frontend

npm install react react-dom

npm install react-router-dom

npm install redux

npm install react-redux

npm install redux-thunk

**npm i semantic-ui-css --save Redux Logger

**npm i redux-logger --save Possível ver os states no console.

# Dependências Backend

Crie o banco de dados manulmente no PostgreSQL com o seguinte comando:
`CREATE DATABASE GerenciamentoFinanceiro;`

No arquivo `appsettings.json`, configure sua string de conexão ao banco de dados, ela deve se parecer com isso:

<pre>{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Port=5432;Database=GerenciamentoFinanceiro;Username=SeuUsuario;Password=SuaSenha"
  }
} </pre>

Substitua "SeuUsuario" pelo seu usuário do PostgreSQL, bem como também o "SuaSenha" por sua senha real.


Mac, Linux (CLI):

- Criação da tabela de Usuarios `dotnet ef database update --context UsuariosDbContext`
- Criação da tabela de Despesas `dotnet ef database update --context DespesasDbContext`
- Criação da tabela de Receitas `dotnet ef database update --context ReceitasDbContext`

Windows(Visual Studio) (NuGet Package Console):

- Criação da tabela de Usuarios `Update-Database -Context UsuariosDbContext`
- Criação da tabela de Despesas `Update-Database -Context DespesasDbContext`
- Criação da tabela de Receitas `Update-Database -Context ReceitasDbContext`
  
Cada DbContext representa um conjunto específico de tabelas e migrações que precisam ser aplicadas separadamente.


