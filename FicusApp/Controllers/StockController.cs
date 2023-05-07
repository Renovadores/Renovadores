using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using FicusApp.Models;
using System.Linq;

namespace FicusApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StockController : ControllerBase
    {
        private readonly FicusDbContext _context;

        public StockController(FicusDbContext context)
        {
            _context = context;
        }
        [HttpPost]
        [Route("AddProductos")]
        public async Task<IActionResult> AddProductos([FromBody]Producto request)
        {
            await _context.Producto.AddAsync(request);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
