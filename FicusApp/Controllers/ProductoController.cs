﻿using Microsoft.AspNetCore.Http;
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

        [HttpGet]
        [Route("GetProducts")]
        public async Task<IActionResult> GetProducts()
        {
            List<Producto> productos = await _productService.GetProducts();
            return Ok(productos);
        }

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

        [HttpPost]
        [Route("AddProduct")]
        public async Task<IActionResult> AddProduct([FromBody] Producto request)
        {
            await _productService.AddProduct(request);
            return Ok();
        }

        [HttpPut]
        [Route("EditProducto")]
        public async Task<IActionResult> EditProducto([FromBody] Producto producto)
        {
            await _productService.EditProduct(producto);
            return Ok();
        }
        
        [HttpPut]
        [Route("DeleteProducto")]
        public async Task<IActionResult> DeleteProducto([FromBody] Producto producto)
        {
            await _productService.DeleteProduct(producto);
            return Ok();
        }
    }
}

