using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using FicusApp.Models;

namespace FicusApp.Services;

public interface IProductService
{
    Task<List<Producto>> GetProducts();
    Task<Producto> GetProducto(string ProductoId);
    Task<Producto> AddProduct([FromBody] Producto request);
    Task<Producto> EditProduct([FromBody] Producto producto);
    Task<Producto> DeleteProduct([FromBody] Producto producto);
}
