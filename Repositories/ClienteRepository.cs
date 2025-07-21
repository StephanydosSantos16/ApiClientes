using Dapper;
using ApiClientes.Models;
using ApiClientes.Data;
using ApiClientes.Repositories.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ApiClientes.Repositories
{
    public class ClienteRepository : IClienteRepository
    {
        private readonly DbSession _dbSession;

        public ClienteRepository(DbSession dbSession)
        {
            _dbSession = dbSession;
        }

        public async Task<IEnumerable<Cliente>> GetAllAsync()
        {
            using var connection = _dbSession.CreateConnection();
            var sql = "SELECT * FROM Clientes";
            return await connection.QueryAsync<Cliente>(sql);
        }

        public async Task<Cliente?> GetByIdAsync(int id)
        {
            using var connection = _dbSession.CreateConnection();
            var sql = "SELECT * FROM Clientes WHERE Id = @Id";
            return await connection.QueryFirstOrDefaultAsync<Cliente>(sql, new { Id = id });
        }

        public async Task<int> CreateAsync(Cliente cliente)
        {
            using var connection = _dbSession.CreateConnection();
            var sql = @"
                INSERT INTO Clientes (Nome, Email) 
                VALUES (@Nome, @Email); 
                SELECT CAST(SCOPE_IDENTITY() as int);";
            var id = await connection.ExecuteScalarAsync<int>(sql, cliente);
            return id;
        }

        public async Task<bool> UpdateAsync(Cliente cliente)
        {
            using var connection = _dbSession.CreateConnection();
            var sql = @"
                UPDATE Clientes 
                SET Nome = @Nome, Email = @Email 
                WHERE Id = @Id";
            var affectedRows = await connection.ExecuteAsync(sql, cliente);
            return affectedRows > 0;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            using var connection = _dbSession.CreateConnection();
            var sql = "DELETE FROM Clientes WHERE Id = @Id";
            var affectedRows = await connection.ExecuteAsync(sql, new { Id = id });
            return affectedRows > 0;
        }
    }
}
