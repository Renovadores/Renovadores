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

        public async Task<List<Producto>> GetProducts()
        {
            List<Producto> productos = _context.Producto.OrderByDescending(c => c.ProductoId).Where(c => c.Descontinuado == 0).ToList();
            return productos;
        }

        public async Task<Producto> GetProducto(string SKU)
        {
            Producto producto = await _context.Producto.FindAsync(SKU);
            return producto;
        }

        public async Task<List<Producto>> GetMatchProducts(string input, bool searchByCode)
        {
            List<Producto> matchProducts;
            if (searchByCode)
            {
                matchProducts = _context.Producto
                .Where(p => p.ProductoId.StartsWith(input))
                .OrderBy(p => p.ProductoId)
                .Take(8)
                .ToList();
            }
            else
            {
                //search by name
                matchProducts = _context.Producto
                .Where(p => p.Nombre.StartsWith(input))
                .OrderBy(p => p.Nombre)
                .Take(8)
                .ToList();
            }
            return matchProducts;
        }

        public async Task<Producto> AddProduct([FromBody] Producto request)
        {
            await _context.Producto.AddAsync(request);
            await _context.SaveChangesAsync();
            return request;
        }

        public async Task<Producto> EditProduct([FromBody] Producto producto)
        {
            _context.Producto.Update(producto);
            _context.SaveChanges();
            return producto;
        }
        public async Task<Producto> DeleteProduct([FromBody] Producto producto)
        {
            _context.Producto.Update(producto);
            _context.SaveChanges();
            return producto;
        }
    }
}
