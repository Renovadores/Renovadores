using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using FicusApp.Models;
using FicusApp.Services;

namespace FicusApp.Controllers
{
   [Route("api/[controller]")]
    [ApiController]
public class ProductoController : ControllerBase
    {
        private readonly ProductService _productService;

        public ProductoController(ProductService productService)
        {
            _productService = productService;
        }

        [HttpGet]
        [Route("GetProducts")]
        public async Task<IActionResult> GetProducts()
        {
            List<Producto> productos = await _productService.GetProducts();
            return Ok(productos);
        }

        [HttpGet]
        [Route("GetProducto/{SKU}")]
        public async Task<IActionResult> GetProducto(string SKU)
        {
            Producto producto = await _productService.GetProducto(SKU);
            return Ok(producto);
        }

        [HttpPost]
        [Route("AddProduct")]
        public async Task<IActionResult> AddProduct([FromBody] Producto request)
        {
            await _productService.AddProduct(request);
            return Ok();
        }

        [HttpPut]
        [Route("EditProducto")]
        public async Task<IActionResult> EditProduct([FromBody] Producto producto)
        {
            await _productService.EditProduct(producto);
            return Ok();
        }
        [HttpPut]
        [Route("DeleteProducto")]
        public async Task<IActionResult> DeleteProduct([FromBody] Producto producto)
        {
            await _productService.DeleteProduct(producto);
            return Ok();
        }
    }
}

