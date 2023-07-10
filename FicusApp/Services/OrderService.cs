using FicusApp.Controllers;
using FicusApp.Models;
using Microsoft.AspNetCore.Mvc;
using static Microsoft.Extensions.Logging.EventSource.LoggingEventSource;
using System.Runtime.Intrinsics.X86;
using static NuGet.Packaging.PackagingConstants;
using Microsoft.EntityFrameworkCore;

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

        public Task<int> GetNewCode()
        {
            int code = _context.Orden.Count() + 1;
            return Task.FromResult(code);
        }

        public Task<List<Orden>> GetOrders()
        {
            List<Orden> orders = _context.Orden.ToList();
            return Task.FromResult(orders);
        }

        public Task<List<List<Orden>>> GetOrdersByDate(int eventId)
        {
            List<Orden> orders = _context.Orden
                                .Where(o => o.Evento != null && 
                                       o.EventoId == eventId)
                                .Include(o => o.Cliente)
                                .OrderBy(O => O.FechaAlquiler)
                                .ToList();
            List<List<Orden>> filterOrders = new();
            foreach (var o in orders)
            {
                bool added = false;
                foreach (var subList in filterOrders)
                {
                    if (subList[0].FechaAlquiler == o.FechaAlquiler)
                    {
                        subList.Add(o);
                        added = true;
                        break;
                    }
                }
                if (!added)
                {
                    filterOrders.Add(new List<Orden>() {o});
                }
            }
            return Task.FromResult(filterOrders);
        }
    }
}
