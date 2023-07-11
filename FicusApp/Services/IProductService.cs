using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using FicusApp.Models;

namespace FicusApp.Services;

public interface IProductService
{
    Task<List<Producto>> GetProducts();
    Task<List<Producto>> GetMatchProducts(string input, bool searchByCode);
    Task<Producto> GetProducto(string SKU);
    Task<Producto> AddProduct([FromBody] Producto request);
    Task<Producto> EditProduct([FromBody] Producto producto);
    Task<Producto> DeleteProduct([FromBody] Producto producto);
    Task<List<Categoria>> GetCategory();
    Task<List<Color>> GetColor();
    Task<List<Familia>> GetFamily();
}
