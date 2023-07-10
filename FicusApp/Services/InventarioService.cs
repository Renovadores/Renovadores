using FicusApp.Controllers;
using FicusApp.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FicusApp.Services;

    public class InventarioService : IInventarioService
    {
        private readonly FicusContext _context;

        public InventarioService(FicusContext context)
        {
            _context = context;
        }
        public Task<List<Inventario>> GetInventory()
        {
            //List<Inventario> Inventarios = _context.Inventario.OrderByDescending(c => c.Producto).ToList();
            var Inventarios = _context.Inventario
                .Include(inventario => inventario.Producto)
                .OrderByDescending(c => c.ProductoId)
                .ToList();

            return Task.FromResult(Inventarios);
        }
        public Task<newId> GetNewId()
        {
            newId id = new newId();
            id.Id = _context.Inventario.Count() + 1;
            return Task.FromResult(id);
        }

    /*
        public async Task<List<Estado>> GetState()
        {
            var Estados = _context.Estado
                .ToList();

            return Estados;
        }*/

        public async Task<Inventario> GetInventoryDetail(string ProductoId)
        {
            Inventario inventario = await _context.Inventario.FindAsync(ProductoId);

            return inventario;
        }

        public async Task<Inventario?> GetInventoryRow(int InventarioId)
        {
            var inventario = await _context.Inventario.FindAsync(InventarioId);

            return inventario;
        }

        public async Task<Inventario> AddInventory([FromBody] Inventario request)
        {
            var task = await _context.Inventario.AddAsync(request);
            
            await _context.SaveChangesAsync();

            var inventory = task.Entity;

            _context
                .Entry(inventory)
                .Reference(i => i.Producto)
                .Load();

            return inventory;
        }

        public Task<Inventario> EditInventory([FromBody] Inventario inventario)
        {
            _context.Inventario.Update(inventario);
            _context.SaveChanges();
            return Task.FromResult(inventario);
        }

        public Task<List<Inventario>> GetMatchInventory(string input)
        {
            List<Inventario> matchInventory;
                matchInventory = _context.Inventario
                .Where(p => p.ProductoId.Contains(input))
                .OrderBy(p => p.ProductoId)
                .OrderByDescending(p => p.Producto.Disponible)
                .Take(8)
                .ToList();
            return Task.FromResult(matchInventory);
        }
    }
