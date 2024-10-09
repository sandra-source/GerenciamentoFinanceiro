# Dependências Frontend

npm install react react-dom

npm install react-router-dom

npm install redux

npm install react-redux

npm install redux-thunk

**npm i semantic-ui-css --save Redux Logger

**npm i redux-logger --save Possível ver os states no console.

# Dependências Backend

Mac, Linux (CLI):

- Criação da tabela de Usuarios `dotnet ef database update --context UsuariosDbContext`
- Criação da tabela de Despesas `dotnet ef database update --context DespesasDbContext`
- Criação da tabela de Receitas `dotnet ef database update --context ReceitasDbContext`

Windows(Visual Studio) (NuGet Package Console):

- Criação da tabela de Usuarios `Update-Database -Context UsuariosDbContext`
- Criação da tabela de Despesas `Update-Database -Context DespesasDbContext`
- Criação da tabela de Receitas `Update-Database -Context ReceitasDbContext`
  
Cada DbContext representa um conjunto específico de tabelas e migrações que precisam ser aplicadas separadamente.

