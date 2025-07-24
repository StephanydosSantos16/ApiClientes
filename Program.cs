using ApiClientes.Data;
using ApiClientes.Repositories;
using ApiClientes.Repositories.Interfaces;
using ApiClientes.Services;
using ApiClientes.Services.Interfaces;

var builder = WebApplication.CreateBuilder(args);

// Serviços padrão
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Injeção de dependência
builder.Services.AddSingleton<DbSession>();
builder.Services.AddScoped<IClienteRepository, ClienteRepository>();
builder.Services.AddScoped<IClienteService, ClienteService>();

// CORS liberado para qualquer origem (⚠️ apenas para testes!)
var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
        policy =>
        {
            policy.AllowAnyOrigin()
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

// Configura para escutar na porta 80 (Render exige isso)
builder.WebHost.ConfigureKestrel(options =>
{
    options.ListenAnyIP(80);
});

var app = builder.Build();

// Swagger
app.UseSwagger();
app.UseSwaggerUI();

// CORS
app.UseCors(MyAllowSpecificOrigins);

// Mapeia os controllers
app.MapControllers();

app.Run();
