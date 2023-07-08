using FicusApp.Models;
using Microsoft.AspNetCore.Mvc;
using static NuGet.Packaging.PackagingConstants;

namespace FicusApp.Services
{
    public interface IOrderService
    {
        Task<List<Orden>> GetOrders();
        Task<int> GetNewCode();
        Task<int> AddOrder([FromBody] Orden request);
        Task UpdateOrden(Orden orden);
        bool OrdenExists(int id);
    }
}
