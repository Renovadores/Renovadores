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

        public Task<List<Producto>> GetProducts()
        {
            var productos = _context.Producto
             //.Include(p => p.Color)
             //.Include(p => p.Familia)
             //.Include(p => p.Categoria)
            .OrderByDescending(p => p.ProductoId)
            .Where(p => p.Descontinuado == 0).ToList();
            return Task.FromResult(productos);
        }

        public async Task<Producto> GetProducto(string SKU)
        {
            return await _context.Producto
                .Include(p => p.Color)
                .Include(p => p.Familia)
                .Include(p => p.Categoria)
                .Where(e => e.ProductoId == SKU)
                .FirstAsync();
        }

        public async Task<Producto> GetProductForOrder(string SKU)
        {
            Producto producto = await _context.Producto.FindAsync(SKU);
            return producto;
        }

    public Task<List<Producto>> GetMatchProducts(string input, bool searchByCode)
        {
            List<Producto> matchProducts;
            if (searchByCode)
            {
                matchProducts = _context.Producto
                .Where(p => p.ProductoId.Contains(input))
                .OrderBy(p => p.ProductoId)
                .OrderBy(p => p.Descontinuado)
                .OrderByDescending(p => p.Disponible)
                .Take(8)
                .ToList();
            }
            else
            {
                //search by name
                matchProducts = _context.Producto
                .Where(p => p.Nombre.StartsWith(input))
                .OrderBy(p => p.Nombre)
                .OrderBy(p => p.Descontinuado)
                .OrderByDescending(p => p.Disponible)
                .Take(8)
                .ToList();
            }
            return Task.FromResult(matchProducts);
        }

        public async Task<Producto> AddProduct([FromBody] Producto request)
        {
            await _context.Producto.AddAsync(request);
            await _context.SaveChangesAsync();
            return request;
        }

        public Task<Producto> EditProduct([FromBody] Producto producto)
        {
            _context.Producto.Update(producto);
            _context.SaveChanges();
            return Task.FromResult(producto);
        }
        public Task<Producto> DeleteProduct([FromBody] Producto producto)
        {
            _context.Producto.Update(producto);
            _context.SaveChanges();
            return Task.FromResult(producto);
        }

        /*
        public async Task<List<Estado>> GetState()
        {
            var Estados = _context.Estado
                .ToList();

            return Estados;
        }*/
        public Task<List<Categoria>> GetCategory()
        {
            var Categorias = _context.Categoria
                .ToList();

            return Task.FromResult(Categorias);
        }

        public Task<List<Color>> GetColor()
        {
            var Colores = _context.Color
                .ToList();

            return Task.FromResult(Colores);
        }

        public Task<List<Familia>> GetFamily()
        {
            var Familias = _context.Familia
                .ToList();

            return Task.FromResult(Familias);
        }
    }

