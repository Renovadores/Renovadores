using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using FicusApp.Models;
using FicusApp.Services;
using Microsoft.AspNetCore.Authorization;

namespace FicusApp.Controllers
{
   [Route("api/[controller]")]
    [ApiController]
public class ProductoController : ControllerBase
    {
        private readonly IProductService _productService;

        public ProductoController(IProductService productService)
        {
            _productService = productService;
        }

        [Authorize]
        [HttpGet]
        [Route("GetProducts")]
        public async Task<IActionResult> GetProducts()
        {
            List<Producto> productos = await _productService.GetProducts();
            return Ok(productos);
        }

        [Authorize]
        [HttpGet]
        [Route("GetProducto/{ProductoId}")]
        public async Task<IActionResult> GetProducto(string ProductoId)
        {
            Producto producto = await _productService.GetProducto(ProductoId);
            return Ok(producto);
        }

        [Authorize]
        [HttpGet]
        [Route("GetMatchProducts/{input}/{searchByCode}")]
        public async Task<IActionResult> GetMatchProducts(string input, bool searchByCode)
        {
            List<Producto> matchProducts = await _productService.GetMatchProducts(input, searchByCode);
            return Ok(matchProducts);
        }

        [Authorize]
        [HttpPost]
        [Route("AddProduct")]
        public async Task<IActionResult> AddProduct([FromBody] Producto request)
        {
            await _productService.AddProduct(request);
            return Ok();
        }

        [Authorize]
        [HttpPut]
        [Route("EditProducto")]
        public async Task<IActionResult> EditProducto([FromBody] Producto producto)
        {
            await _productService.EditProduct(producto);
            return Ok();
        }

        [Authorize]
        [HttpPut]
        [Route("DeleteProducto")]
        public async Task<IActionResult> DeleteProducto([FromBody] Producto producto)
        {
            await _productService.DeleteProduct(producto);
            return Ok();
        }

        [Authorize]
        [HttpGet]
        [Route("GetCategory")]
        public async Task<IActionResult> GetCategory()
        {
            List<Categoria> productos = await _productService.GetCategory();
            return Ok(productos);
        }

        [Authorize]
        [HttpGet]
        [Route("GetColor")]
        public async Task<IActionResult> GetColor()
        {
            List<Color> productos = await _productService.GetColor();
            return Ok(productos);
        }

        [Authorize]
        [HttpGet]
        [Route("GetFamily")]
        public async Task<IActionResult> GetFamily()
        {
            List<Familia> productos = await _productService.GetFamily();
            return Ok(productos);
        }
    }
}

