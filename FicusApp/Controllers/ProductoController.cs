using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using FicusApp.Models;

namespace FicusApp.Controllers
{
   [Route("api/[controller]")]
    [ApiController]
public class ProductoController : ControllerBase
    {
        private readonly FicusContext _context;

        public ProductoController(FicusContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("GetProducts")]
        public async Task<IActionResult> GetProducts()
        {
            List<Producto> productos = _context.Producto.OrderByDescending(c => c.ProductoId).Where(c =>c.Descontinuado == 0).ToList();
            return Ok(productos);
        }

        [HttpGet]
        [Route("GetProducto/{ProductoId}")]
        public async Task<IActionResult> GetProducto(string ProductoId)
        {
            Producto producto = await _context.Producto.FindAsync(ProductoId);
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
        [HttpPut]
        [Route("DeleteProducto")]
        public async Task<IActionResult> DeleteProduct([FromBody] Producto producto)
        {
            _context.Producto.Update(producto);
            _context.SaveChanges();
            return Ok();
        }
    }
}

