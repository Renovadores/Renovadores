using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using FicusApp.Models;
using Microsoft.EntityFrameworkCore;

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
                .Include(inventario => inventario.EstadoNavigation)
                .Include(inventario => inventario.ProductoNavigation)
                .OrderByDescending(c => c.Producto)
                .ToList();

            return Ok(Inventarios);
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
