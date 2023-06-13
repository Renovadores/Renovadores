using FicusApp.Models;
using Microsoft.AspNetCore.Mvc;

namespace FicusApp.Services
{
    public interface IOrderService
    {
        Task<List<Orden>> GetOrders();
        Task<int> GetNewCode();
        Task<int> AddOrder([FromBody] Orden request);
    }
}
