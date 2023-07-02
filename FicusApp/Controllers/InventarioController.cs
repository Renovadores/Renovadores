using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using FicusApp.Models;
using Microsoft.EntityFrameworkCore;
using FicusApp.Services;
using Microsoft.AspNetCore.Authorization;

namespace FicusApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InventarioController : ControllerBase
    {
        private readonly IInventarioService _inventarioService;

        public InventarioController(IInventarioService inventarioService)
        {
            _inventarioService = inventarioService;
        }

        [Authorize]
        [HttpGet]
        [Route("GetInventory")]
        public async Task<IActionResult> GetInventory()
        {
            //List<Inventario> Inventarios = _context.Inventario.OrderByDescending(c => c.Producto).ToList();
            var Inventarios = await _inventarioService.GetInventory();
            return Ok(Inventarios);
        }

        [Authorize]
        [HttpGet]
        [Route("GetNewId")]
        public async Task<IActionResult> GetNewId()
        {
            newId id = new newId();
            id.Id = (await _inventarioService.GetNewId()).Id;
            return Ok(id);
        }

        /*[HttpGet]
        [Route("GetState")]
        public async Task<IActionResult> GetState()
        {
            var Estados = await _inventarioService.GetState();
            return Ok(Estados);
        }*/

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

        [Authorize]
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

        [Authorize]
        [HttpGet]
        [Route("GetMatchInventory/{input}/{searchByCode}")]
        public async Task<IActionResult> GetMatchInventory(string input, bool searchByCode)
        {
            List<Inventario> matchInventory = await _inventarioService.GetMatchInventory(input, searchByCode);
            return Ok(matchInventory);
        }
    }
}