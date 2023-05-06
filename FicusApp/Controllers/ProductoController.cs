using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using FicusApp.Models;

namespace FicusApp.Controllers
{
   [Route("api/[controller]")]
    [ApiController]
public class ProductoController : ControllerBase
    {
        private readonly FicusDbContext _context;

        public ProductoController(FicusDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("GetProducts")]
        public async Task<IActionResult> GetProducts()
        {
            List<Producto> productos = _context.Productos.OrderByDescending(c => c.ProductoID).ToList();
            return Ok(productos);
        }

        [HttpPost]
        [Route("AddProduct")]
        public async Task<IActionResult> AddProduct([FromBody] Producto request)
        {
            await _context.Productos.AddAsync(request);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}

