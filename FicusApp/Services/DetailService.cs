using FicusApp.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FicusApp.Services
{
    public class DetailService : IDetailService
    {
        private readonly FicusContext _context;

        public DetailService(FicusContext context)
        {
            _context = context;
        }

        public async Task<int> AddDetalle([FromBody] Detalle request)
        {
            await _context.Detalle.AddAsync(request);
            await _context.SaveChangesAsync();

            await CalcularSinUsar(request);
            await CalcularMontoOrden(request.OrdenId);

            return 0;
        }

        public async Task<List<Detalle>> GetDetalle()
        {
            List<Detalle> details = new();
            if (_context.Detalle == null)
            {
                return details;
            }
            details = await _context.Detalle.ToListAsync();
            return details;
        }

        public async Task<bool> UpdateDetalleExists(int OrdenId, string ProductoId)
        {
            bool detalleExists = await _context.Detalle.AnyAsync(e => e.OrdenId == OrdenId && e.ProductoId == ProductoId);
            return detalleExists;
        }

        public async Task UpdateDetalle(Detalle detalle)
        {
            _context.Entry(detalle).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            await CalcularSinUsar(detalle);
            await CalcularMontoOrden(detalle.OrdenId);
        }

        public bool DetalleExists(int OrdenId, string ProductoId)
        {
            return (_context.Detalle?.Any(e => e.OrdenId == OrdenId && e.ProductoId == ProductoId)).GetValueOrDefault();
        }

        private async Task CalcularSinUsar(Detalle detalle)
        {
            detalle.SinUsar = detalle.Pedidos - detalle.Usados;
            _context.Entry(detalle).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        private async Task CalcularMontoOrden(int OrdenId)
        {
            var detalles = await _context.Detalle.Where(d => d.OrdenId == OrdenId).ToListAsync();
            int montoTotal = 0;

            foreach (var detalle in detalles)
            {
                var producto = await _context.Producto.FirstOrDefaultAsync(p => p.ProductoId == detalle.ProductoId);
                if (producto != null)
                {
                    int cantidad = (int)detalle.Usados > 0 ? (int)detalle.Usados : (int)detalle.Pedidos;
                    int alquiler = (int)detalle.Usados > 0 ? (int)producto.AlquilerComercios : (int)producto.AlquilerComercios;
                    montoTotal += cantidad * alquiler;
                }
            }

            var orden = await _context.Orden.FirstOrDefaultAsync(o => o.OrdenId == OrdenId);
            if (orden != null)
            {
                orden.Monto = montoTotal;
                _context.Entry(orden).State = EntityState.Modified;
                await _context.SaveChangesAsync();
            }
        }
    }
}
