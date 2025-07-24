using ApiClientes.Data;
using ApiClientes.Repositories;
using ApiClientes.Repositories.Interfaces;
using ApiClientes.Services;
using ApiClientes.Services.Interfaces;

var builder = WebApplication.CreateBuilder(args);

// Adiciona serviços
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Injeta dependências
builder.Services.AddSingleton<DbSession>();
builder.Services.AddScoped<IClienteRepository, ClienteRepository>();
builder.Services.AddScoped<IClienteService, ClienteService>();

// Libera CORS para qualquer origem (importante para conectar com o frontend na Render)
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy
            .AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

// Configura Kestrel para ouvir na porta 80 (necessário na Render)
builder.WebHost.ConfigureKestrel(options =>
{
    options.ListenAnyIP(80);
});

var app = builder.Build();

// Middleware do Swagger
app.UseSwagger();
app.UseSwaggerUI();

// Usa CORS
app.UseCors();

// Mapear controladores
app.MapControllers();

// Roda a aplicação
app.Run();
