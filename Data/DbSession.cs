using Microsoft.Data.SqlClient;
using System.Data;

namespace ApiClientes.Data
{
    public class DbSession
    {
        private readonly IConfiguration _configuration;
        private readonly string _connectionString;

        public DbSession(IConfiguration configuration)
        {
            _configuration = configuration;
            _connectionString = _configuration.GetConnectionString("DefaultConnection")
                ?? throw new InvalidOperationException("A string de conexão 'DefaultConnection' não foi encontrada.");
        }

        public IDbConnection CreateConnection()
        {
            return new SqlConnection(_connectionString);
        }
    }
}
