﻿using FicusApp.Controllers;
using FicusApp.Models;
using Microsoft.AspNetCore.Mvc;

namespace FicusApp.Services
{
    public class ClientService : IClientService
    {
        private readonly FicusContext _context;
        private const int SUCCESS_CODE = 0;
        private const int OUT_OF_RANGE_CODE = 1;
        private const int NOT_FOUND_CODE = -1;

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

        public async Task<(int, Cliente?)> GetCliente(int id)
        {
            int code = SUCCESS_CODE;
            Cliente? cliente = null;

            if (_context.Cliente.Count() == 0)
            {
                code = NOT_FOUND_CODE;
            }
            else if (id < 0 || id > _context.Cliente.Max(c=>c.ClienteId))
            {
                code = OUT_OF_RANGE_CODE;
            }
            else
            {
                cliente = await _context.Cliente.FindAsync(id);
            }
            (int, Cliente?) response = (code, cliente);
            return response;
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

        public async Task<List<Cliente>> GetMatchClients(string input)
        {
            List<Cliente> matchClients;
            matchClients = _context.Cliente
                .Where(p => p.NombreEmpresa.StartsWith(input) && p.Estado != "Eliminado")
                .OrderBy(p => p.NombreEmpresa)
                .Take(8)
                .ToList();
            return matchClients;
        }
    }
}
