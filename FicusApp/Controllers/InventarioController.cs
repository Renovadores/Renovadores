using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using FicusApp.Models;

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
            List<Inventario> Inventarios = _context.Inventario.OrderByDescending(c => c.Producto).ToList();
            return Ok(Inventarios);
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
