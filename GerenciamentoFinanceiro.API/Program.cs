using GerenciamentoFinanceiro.Domain.Interfaces;
using GerenciamentoFinanceiro.Infrastructure.Data;
using GerenciamentoFinanceiro.Infrastructure.Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Configuração do DbContext e repositórios
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// Injeção de dependência dos repositórios
builder.Services.AddScoped<IDespesaRepository, DespesaRepository>();
builder.Services.AddScoped<IReceitaRepository, ReceitaRepository>();

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

// Adicionar o serviço de autorização e controladores
builder.Services.AddControllers();
builder.Services.AddAuthorization(); // Adiciona o serviço de autorização

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Use o Swagger apenas no ambiente de desenvolvimento
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Adicionar middleware de autenticação e autorização
app.UseHttpsRedirection();
app.UseRouting();
app.UseAuthentication();  // Habilitar o middleware de autenticação
app.UseAuthorization();   // Habilitar o middleware de autorização

// Mapear os controladores da API
app.MapControllers();

app.Run();
