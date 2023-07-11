using FicusApp.Controllers;
using Microsoft.EntityFrameworkCore;
using FicusApp.Models;
using Microsoft.AspNetCore.Mvc;
using static Microsoft.Extensions.Logging.EventSource.LoggingEventSource;
using System.Runtime.Intrinsics.X86;
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

        public async Task UpdateOrden(Orden orden)
        {
            _context.Entry(orden).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public bool OrdenExists(int id)
        {
            return _context.Orden.Any(e => e.OrdenId == id);
        }

        public async Task<bool> DeleteOrden(int id)
        {
            var orden = await _context.Orden.FindAsync(id);
            if (orden == null)
            {
                return false; // Indicate that the order was not found
            }

            _context.Orden.Remove(orden);
            await _context.SaveChangesAsync();

            return true; // Indicate successful deletion
        }


        public async Task<List<Orden>> GetTodayOrder()
        {
            List<Orden> orders = await _context.Orden
                                .Include(o => o.Cliente)
                                .Include(o => o.Evento)
                                .Include(o => o.HistorialOrden)
                                .Where(o => o.FechaAlquiler == DateTime.Today
                                        && o.HistorialOrden.OrderByDescending(h => h.FaseId)
                                        .FirstOrDefault().FaseId == 1)
                                .ToListAsync();
            return orders;
        }

        public async Task<List<List<Orden>>> GetOrdersByDate(int eventId)
        {
            List<Orden> orders = await _context.Orden
                                .Where(o => o.Evento != null && 
                                       o.EventoId == eventId)
                                .Include(o => o.Cliente)
                                .Include(o => o.HistorialOrden)
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
            // verify if there are dates with all his orders in finished state
            foreach (var date in filterOrders.ToList())
            {
                int totalOrders = date.Count();
                int counterFinished = 0;
                foreach (var order in date)
                {
                    if (order.HistorialOrden?.OrderByDescending(h => h.FaseId)?
                        .FirstOrDefault()?.FaseId == 3)
                    {
                        counterFinished++;
                    }
                }
                if (totalOrders == counterFinished)
                {
                    filterOrders.Remove(date);
                }
            }
            return filterOrders;
        }
    }
}
