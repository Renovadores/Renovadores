using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FicusApp.Models;

namespace FicusApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HistorialOrdenController : ControllerBase
    {
        private readonly FicusContext _context;

        public HistorialOrdenController(FicusContext context)
        {
            _context = context;
        }

        // GET: api/HistorialOrden
        [HttpGet]
        public async Task<ActionResult<IEnumerable<HistorialOrden>>> GetHistorialOrden()
        {
          if (_context.HistorialOrden == null)
          {
              return NotFound();
          }
            return await _context.HistorialOrden.ToListAsync();
        }

        // GET: api/HistorialOrden/5
        [HttpGet("{OrdenId}/{FaseId}")]
        public async Task<ActionResult<HistorialOrden>> GetHistorialOrden(int OrdenId, int FaseId)
        {
          if (_context.HistorialOrden == null)
          {
              return NotFound();
          }
            var historialOrden = await _context.HistorialOrden.FindAsync(OrdenId, FaseId);

            if (historialOrden == null)
            {
                return NotFound();
            }

            return historialOrden;
        }

        // PUT: api/HistorialOrden/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{OrdenId}/{FaseId}")]
        public async Task<IActionResult> PutHistorialOrden(int OrdenId, int FaseId, HistorialOrden historialOrden)
        {
            if (OrdenId != historialOrden.OrdenId && historialOrden.FaseId != FaseId)
            {
                return BadRequest();
            }

            _context.Entry(historialOrden).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!HistorialOrdenExists(OrdenId, FaseId))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/HistorialOrden
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<HistorialOrden>> PostHistorialOrden(HistorialOrden historialOrden)
        {
          if (_context.HistorialOrden == null)
          {
              return Problem("Entity set 'FicusContext.HistorialOrden'  is null.");
          }
            _context.HistorialOrden.Add(historialOrden);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (HistorialOrdenExists(historialOrden.OrdenId, historialOrden.FaseId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetHistorialOrden", new { id = historialOrden.OrdenId }, historialOrden);
        }

        // DELETE: api/HistorialOrden/5
        [HttpDelete("{OrdenId}/{FaseId}")]
        public async Task<IActionResult> DeleteHistorialOrden(int OrdenId, int FaseId)
        {
            if (_context.HistorialOrden == null)
            {
                return NotFound();
            }
            var historialOrden = await _context.HistorialOrden.FindAsync(OrdenId, FaseId);
            if (historialOrden == null)
            {
                return NotFound();
            }

            _context.HistorialOrden.Remove(historialOrden);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool HistorialOrdenExists(int OrdenId, int FaseId)
        {
            return (_context.HistorialOrden?.Any(e => e.OrdenId == OrdenId && e.FaseId == FaseId)).GetValueOrDefault();
        }
    }
}
