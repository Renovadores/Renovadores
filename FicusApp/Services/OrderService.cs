using FicusApp.Controllers;
using Microsoft.EntityFrameworkCore;
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

        public async Task<int> GetNewCode()
        {
            int code = await _context.Orden.CountAsync() + 1;
            return code;
        }

        public async Task<List<Orden>> GetOrders()
        {
            List<Orden> orders = await _context.Orden.ToListAsync();
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
        public async Task<List<Orden>> GetTodayOrder()
        {
            List<Orden> orders = await _context.Orden
                                .Include(o => o.Cliente)
                                .Include(o => o.Evento)
                                .Where(o => o.FechaAlquiler == DateTime.Today)
                                .ToListAsync();
            return orders;
        }

        public async Task<List<List<Orden>>> GetOrdersByDate(int eventId)
        {
            List<Orden> orders = await _context.Orden
                                .Where(o => o.Evento != null && 
                                       o.EventoId == eventId)
                                .Include(o => o.Cliente)
                                .OrderBy(O => O.FechaAlquiler)
                                .ToListAsync();
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
            return filterOrders;
        }
    }
}
