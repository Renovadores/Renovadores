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
            List<Producto> productos = _context.Producto.OrderByDescending(c => c.Sku).ToList();
            return Ok(productos);
        }

        [HttpGet]
        [Route("GetProducto/{SKU}")]
        public async Task<IActionResult> GetProducto(string SKU)
        {
            Producto producto = await _context.Producto.FindAsync(SKU);
            return Ok(producto);
        }

        [HttpPost]
        [Route("AddProduct")]
        public async Task<IActionResult> AddProduct([FromBody] Producto request)
        {
            await _context.Producto.AddAsync(request);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpPut]
        [Route("EditProducto")]
        public async Task<IActionResult> EditProduct([FromBody] Producto producto)
        {
            _context.Producto.Update(producto);
            _context.SaveChanges();
            return Ok();
        }
    }
}

