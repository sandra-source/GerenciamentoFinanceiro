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

<h2>Atualização das tabelas:</h2>

Mac, Linux (CLI):

- `dotnet ef database update --context UsuariosDbContext`
-  `dotnet ef database update --context TransacoesDbContext`

Windows(Visual Studio) (NuGet Package Console):

- `Update-Database -Context UsuariosDbContext`
- `Update-Database -Context TransacoesDbContext`
  
Cada DbContext representa um conjunto específico de tabelas e migrações que precisam ser aplicadas separadamente.


# Como rodar o projeto

- Abra `GerenciamentoFinanceiro.sln`
- Para rodar o projeto, clique com o botão direito no GerenciamentoFinanceiro.API "set as startup project"
- Inicie o projeto back-end (porta padrão 7024)
- Abra GerenciamentoFinanceiro.UI no terminal, após instalar as dependencias do front-end, e use `npm start`

Como o projeto ainda carece de uma tela de cadastro de usuários, por favor, no postman, após executar o projeto, cadastre um usuário manualmente:

POST: https://localhost:7024/api/auth/novo-usuario

raw - json:
<pre>{
    "id": 0,
    "nome": "Sandra",
    "email": "Sandra@email.com",
    "senha": "senha123",
    "role": "Admin"
}</pre>

todos os usuários são fictícios para fins de teste da aplicação.
  


