using GerenciamentoFinanceiro.Application.Interfaces;  // Interfaces dos serviços
using GerenciamentoFinanceiro.Application.Services;   // Implementações dos serviços
using GerenciamentoFinanceiro.Domain.Interfaces;
using GerenciamentoFinanceiro.Infrastructure.Data;
using GerenciamentoFinanceiro.Infrastructure.Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Usar a mesma string de conexão para todos os DbContexts
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

// Injetar os DbContexts usando a mesma conexão para o banco de dados PostgreSQL
builder.Services.AddDbContext<UsuariosDbContext>(options =>
    options.UseNpgsql(connectionString));
builder.Services.AddDbContext<TransacoesDbContext>(options =>
    options.UseNpgsql(connectionString));

// Injetar os repositórios da camada de infraestrutura (camada de Infrastructure)
builder.Services.AddScoped<IUsuarioRepository, UsuarioRepository>();
builder.Services.AddScoped<ITransacaoRepository, TransacaoRepository>();

// Injetar os serviços da camada de aplicação (camada de Application)
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IRelatorioService, RelatorioService>();
builder.Services.AddScoped<ITransacaoService, TransacaoService>();
// Outros serviços podem ser registrados aqui

// Configurar autenticação e JWT
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
    };
});

// Configuração de CORS para permitir todas as origens (ou configurar origens específicas)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins", builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

// Adicionar o serviço de autorização e controladores da API
builder.Services.AddControllers();
builder.Services.AddAuthorization(); // Adiciona o serviço de autorização

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configurações do Swagger (documentação da API) no ambiente de desenvolvimento
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Configuração de CORS antes dos middlewares de autenticação/autorizaçao
app.UseCors("AllowAllOrigins");

// Adicionar middlewares para autenticação e autorização
app.UseHttpsRedirection();
app.UseRouting();
app.UseAuthentication();  // Middleware de autenticação
app.UseAuthorization();   // Middleware de autorização

// Mapear os controladores da API
app.MapControllers();

app.Run();
