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
            return 0;
        }

        public async Task<List<Detalle>> GetDetalle()
        {
            List<Detalle> details = new ();
            if (_context.Detalle == null)
            {
                return details;
            }
            details = await _context.Detalle.ToListAsync();
            return details; 
        }
    }
}
