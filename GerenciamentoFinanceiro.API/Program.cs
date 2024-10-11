using GerenciamentoFinanceiro.Application.Interfaces;  // Interfaces dos servi�os
using GerenciamentoFinanceiro.Application.Services;   // Implementa��es dos servi�os
using GerenciamentoFinanceiro.Domain.Interfaces;
using GerenciamentoFinanceiro.Infrastructure.Data;
using GerenciamentoFinanceiro.Infrastructure.Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Usar a mesma string de conex�o para todos os DbContexts
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

// Injetar os DbContexts usando a mesma conex�o para o banco de dados PostgreSQL
builder.Services.AddDbContext<UsuariosDbContext>(options =>
    options.UseNpgsql(connectionString));
builder.Services.AddDbContext<TransacoesDbContext>(options =>
    options.UseNpgsql(connectionString));

// Injetar os reposit�rios da camada de infraestrutura (camada de Infrastructure)
builder.Services.AddScoped<IUsuarioRepository, UsuarioRepository>();
builder.Services.AddScoped<ITransacaoRepository, TransacaoRepository>();

// Injetar os servi�os da camada de aplica��o (camada de Application)
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IRelatorioService, RelatorioService>();
builder.Services.AddScoped<ITransacaoService, TransacaoService>();
// Outros servi�os podem ser registrados aqui

// Configurar autentica��o e JWT
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

// Configura��o de CORS para permitir todas as origens (ou configurar origens espec�ficas)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins", builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

// Adicionar o servi�o de autoriza��o e controladores da API
builder.Services.AddControllers();
builder.Services.AddAuthorization(); // Adiciona o servi�o de autoriza��o

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configura��es do Swagger (documenta��o da API) no ambiente de desenvolvimento
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Configura��o de CORS antes dos middlewares de autentica��o/autoriza�ao
app.UseCors("AllowAllOrigins");

// Adicionar middlewares para autentica��o e autoriza��o
app.UseHttpsRedirection();
app.UseRouting();
app.UseAuthentication();  // Middleware de autentica��o
app.UseAuthorization();   // Middleware de autoriza��o

// Mapear os controladores da API
app.MapControllers();

app.Run();
