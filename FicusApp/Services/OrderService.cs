using FicusApp.Controllers;
using Microsoft.EntityFrameworkCore;
using FicusApp.Models;
using Microsoft.AspNetCore.Mvc;
using static NuGet.Packaging.PackagingConstants;

namespace FicusApp.Services
{
    public class OrderService : IOrderService
    {
        private readonly FicusContext _context;

        public OrderService(FicusContext context)
        {
            _context = context;
        }

        public async Task<int> AddOrder([FromBody] Orden request)
        {
            await _context.Orden.AddAsync(request);
            await _context.SaveChangesAsync();
            return 0;
        }

        public async Task<int> GetNewCode()
        {
            int code = _context.Orden.Count() + 1;
            return code;
        }

        public async Task<List<Orden>> GetOrders()
        {
            List<Orden> orders = _context.Orden.ToList();
            return orders;
        }

        public async Task UpdateOrden(Orden orden)
        {
            _context.Entry(orden).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public bool OrdenExists(int id)
        {
            return _context.Orden.Any(e => e.OrdenId == id);
        }
    }
}
