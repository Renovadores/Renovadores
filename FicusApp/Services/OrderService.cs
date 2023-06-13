using FicusApp.Controllers;
using FicusApp.Models;
using Microsoft.AspNetCore.Mvc;

namespace FicusApp.Services
{
    public class OrderService:IOrderService
    {
        private readonly FicusContext _context;

        public OrderService(FicusContext context)
        {
            _context = context;
        }

        public async Task<List<Orden>> GetOrders()
        {
            List<Orden> orders = _context.Orden.ToList();
            return orders;
        }

        public async Task<int> GetNewCode()
        {
            //string code = "OR-";
            //string number = (_context.Orden.Count() + 1).ToString();
            //number = number.PadLeft(4, '0');
            //code += number;
            //NewCode response = new()
            //{
            //    Id = code
            //};
            int code = _context.Orden.Count() + 1;
            return code;
        }

        public async Task<int> AddOrder([FromBody] Orden request)
        {
            // ID is int
            await _context.Orden.AddAsync(request);
            await _context.SaveChangesAsync();
            return 1;
        }
    }
}
