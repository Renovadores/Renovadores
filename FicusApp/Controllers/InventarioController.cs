using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using FicusApp.Models;
using Microsoft.EntityFrameworkCore;
using FicusApp.Services;

namespace FicusApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InventarioController : ControllerBase
    {
        private readonly InventarioService _inventarioService;

        public InventarioController(InventarioService inventarioService)
        {
            _inventarioService = inventarioService;
        }

        [HttpGet]
        [Route("GetInventory")]
        public async Task<IActionResult> GetInventory()
        {
            //List<Inventario> Inventarios = _context.Inventario.OrderByDescending(c => c.Producto).ToList();
            var Inventarios = await _inventarioService.GetInventory();
            return Ok(Inventarios);
        }

        [HttpGet]
        [Route("GetNewId")]
        public async Task<IActionResult> GetNewId()
        {
            newId id = new newId();
            id.Id = (await _inventarioService.GetNewId()).Id;
            return Ok(id);
        }

        [HttpGet]
        [Route("GetState")]
        public async Task<IActionResult> GetState()
        {
            var Estados = await _inventarioService.GetState();
            return Ok(Estados);
        }

        [HttpGet]
        [Route("GetInventory/{ProductoId}")]
        public async Task<IActionResult> GetInventoryDetail(string ProductoId)
        {
            Inventario inventario = await _inventarioService.GetInventoryDetail(ProductoId);
            return Ok(inventario);
        }

        [HttpGet]
        [Route("GetInventoryRow/{InventarioId}")]
        public async Task<IActionResult> GetInventoryRow(int InventarioId)
        {
            Inventario inventario = await _inventarioService.GetInventoryRow(InventarioId);
            return Ok(inventario);
        }

        [HttpPost]
        [Route("AddInventory")]
        public async Task<IActionResult> AddInventory([FromBody] Inventario request)
        {
            var inventario = await _inventarioService.AddInventory(request);
            return Ok(inventario);
        }

        [HttpPut]
        [Route("EditInventory")]
        public async Task<IActionResult> EditInventory([FromBody] Inventario inventario)
        {
            await _inventarioService.EditInventory(inventario);
            return Ok();
        }
    }
}
