var builder = WebApplication.CreateBuilder(args);


// Adicionar o DbContext para o banco de dados PostgreSQL
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// Injeção de dependência dos repositórios
builder.Services.AddScoped<IDespesaRepository, DespesaRepository>();
builder.Services.AddScoped<IReceitaRepository, ReceitaRepository>();

// Adicionar controladores
builder.Services.AddControllers();

// Suporte ao Swagger para documentação da API
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Swagger no ambiente de desenvolvimento
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Configurando roteamento dos controladores
app.UseRouting();
app.MapControllers();

app.Run();
