using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using FicusApp.Models;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;
using System.Text.Json;

namespace FicusApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InventarioController : ControllerBase
    {
        private readonly FicusContext _context;

        public InventarioController(FicusContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("GetInventory")]
        public async Task<IActionResult> GetInventory()
        {
            //List<Inventario> Inventarios = _context.Inventario.OrderByDescending(c => c.Producto).ToList();
            var Inventarios = _context.Inventario
                .Include(inventario => inventario.Estado)
                .Include(inventario => inventario.Producto)
                .OrderByDescending(c => c.Producto)
                .ToList();

            return Ok(Inventarios);
        }

        [HttpGet]
        [Route("GetMatchProducts/{input}/{searchByCode}")]
        public async Task<IActionResult> GetMatchProducts(string input, bool searchByCode)
        {
            List<Inventario> matchProducts;
            if (searchByCode)
            {
                matchProducts = _context.Inventario
                .Where(p => p.ProductoId.StartsWith(input))
                .OrderBy(p => p.ProductoId)
                .OrderBy(p => p.Estado.EstadoId)
                .Take(8)
                .Include(inventario => inventario.Estado)
                .Include(inventario => inventario.Producto)
                .ToList();
            } else
            {
                //search by name
                matchProducts = _context.Inventario
                .Include(inventario => inventario.Estado)
                .Include(inventario => inventario.Producto)
                .Where(p => p.Producto.Nombre.StartsWith(input))
                .OrderBy(p => p.Producto.Nombre)
                .OrderBy(p => p.Estado.EstadoId)
                .Take(8)
                .ToList();
            }
            return Ok(matchProducts);
        }

        [HttpGet]
        [Route("GetNewId")]
        public async Task<IActionResult> GetNewId()
        {
            newId id = new newId();
            id.Id = _context.Inventario.Count() + 1;
            return Ok(id);
        }

        [HttpGet]
        [Route("GetState")]
        public async Task<IActionResult> GetState()
        {
            var Estados = _context.Estado
                .ToList();

            return Ok(Estados);
        }

        [HttpGet]
        [Route("GetProductInventory/{sku}/{status}")]
        public async Task<IActionResult> GetProductInventory(string sku, int status)
        {
            Inventario inventario = await _context.Inventario.FindAsync(sku, status);
            return Ok(inventario);
        }

        [HttpGet]
        [Route("GetInventory/{SKU}")]
        public async Task<IActionResult> GetInventoryDetail(string SKU)
        {
            Inventario inventario = await _context.Inventario.FindAsync(SKU);
            return Ok(inventario);
        }

        [HttpPost]
        [Route("AddInventory")]
        public async Task<IActionResult> AddInventory([FromBody] Inventario request)
        {
            await _context.Inventario.AddAsync(request);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpPut]
        [Route("EditInventory")]
        public async Task<IActionResult> EditInventory([FromBody] Inventario inventario)
        {
            _context.Inventario.Update(inventario);
            _context.SaveChanges();
            return Ok();
        }
    }
}