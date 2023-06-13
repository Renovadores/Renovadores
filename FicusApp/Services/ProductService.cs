using FicusApp.Controllers;
using FicusApp.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FicusApp.Services;

public class ProductService : IProductService
{
    private readonly FicusContext _context;

    public ProductService(FicusContext context)
    {
        _context = context;
    }

    [HttpGet]
    [Route("GetProducts")]
    public async Task<List<Producto>> GetProducts()
    {
        List<Producto> productos = _context.Producto.OrderByDescending(c => c.ProductoId).Where(c => c.Descontinuado == 0).ToList();
        return productos;
    }

    [HttpGet]
    [Route("GetProducto/{SKU}")]
    public async Task<Producto> GetProducto(string SKU)
    {
        Producto producto = await _context.Producto.FindAsync(SKU);
        return producto;
    }

    [HttpPost]
    [Route("AddProduct")]
    public async Task<Producto> AddProduct([FromBody] Producto request)
    {
        await _context.Producto.AddAsync(request);
        await _context.SaveChangesAsync();
        return request;
    }

    [HttpPut]
    [Route("EditProducto")]
    public async Task<Producto> EditProduct([FromBody] Producto producto)
    {
        _context.Producto.Update(producto);
        _context.SaveChanges();
        return producto;
    }
    [HttpPut]
    [Route("DeleteProducto")]
    public async Task<Producto> DeleteProduct([FromBody] Producto producto)
    {
        _context.Producto.Update(producto);
        _context.SaveChanges();
        return producto;
    }
}
