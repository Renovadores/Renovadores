using FicusApp.Models;
using Microsoft.AspNetCore.Mvc;
using static NuGet.Packaging.PackagingConstants;

namespace FicusApp.Services
{
    public interface IOrderService
    {
        Task<List<Orden>> GetOrders();
        Task<List<List<Orden>>> GetOrdersByDate(int eventId);
        Task<int> GetNewCode();
        Task<int> AddOrder([FromBody] Orden request);
    }
}
