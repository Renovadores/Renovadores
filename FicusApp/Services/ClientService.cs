using FicusApp.Controllers;
using FicusApp.Models;
using Microsoft.AspNetCore.Mvc;

namespace FicusApp.Services
{
    public class ClientService : IClientService
    {
        private readonly FicusContext _context;

        public ClientService(FicusContext context)
        {
            _context = context;
        }
        public async Task<int> AddCliente([FromBody] Cliente request)
        {
            await _context.Cliente.AddAsync(request);
            await _context.SaveChangesAsync();
            return 1;
        }

        public async Task<int> DeleteCliente([FromBody] Cliente cliente)
        {
            cliente.Estado = "Eliminado";
            _context.Cliente.Update(cliente);
            await _context.SaveChangesAsync();

            return 1;
        }

        public async Task<int> EditCliente([FromBody] Cliente cliente)
        {
            _context.Cliente.Update(cliente);
            _context.SaveChanges();
            return 1;
        }

        public async Task<Cliente> GetCliente(int id)
        {
            Cliente cliente = await _context.Cliente.FindAsync(id);
            return cliente;
        }

        public async Task<List<Cliente>> GetClientes()
        {
            List<Cliente> clientes = _context.Cliente.Where(c => c.Estado != "Eliminado").OrderByDescending(c => c.ClienteId).ToList();
            return clientes;
        }

        public async Task<int> GetNewId()
        {
            int id = _context.Cliente.Count() + 1;
            return id;
        }
    }
}
