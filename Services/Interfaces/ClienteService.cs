using ApiClientes.Models;
using ApiClientes.Repositories.Interfaces;
using ApiClientes.Services.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ApiClientes.Services
{
    public class ClienteService : IClienteService
    {
        private readonly IClienteRepository _repository;

        public ClienteService(IClienteRepository repository)
        {
            _repository = repository;
        }

        public Task<IEnumerable<Cliente>> GetAllAsync() => _repository.GetAllAsync();

        public Task<Cliente?> GetByIdAsync(int id) => _repository.GetByIdAsync(id);

        public Task<int> CreateAsync(Cliente cliente) => _repository.CreateAsync(cliente);

        public Task<bool> UpdateAsync(Cliente cliente) => _repository.UpdateAsync(cliente);

        public Task<bool> DeleteAsync(int id) => _repository.DeleteAsync(id);
    }
}
