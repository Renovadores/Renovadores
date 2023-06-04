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
    public class Historial_OrdenController : ControllerBase
    {
        private readonly FicusContext _context;

        public Historial_OrdenController(FicusContext context)
        {
            _context = context;
        }

        // GET: api/Historial_Orden
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Historial_Orden>>> GetHistorial_Orden()
        {
          if (_context.Historial_Orden == null)
          {
              return NotFound();
          }
            return await _context.Historial_Orden.ToListAsync();
        }

        // GET: api/Historial_Orden/5
        [HttpGet("{orden}/{fase}")]
        public async Task<ActionResult<Historial_Orden>> GetHistorial_Orden(string orden, int fase)
        {
          if (_context.Historial_Orden == null)
          {
              return NotFound();
          }
            var historial_Orden = await _context.Historial_Orden.FindAsync(orden, fase);

            if (historial_Orden == null)
            {
                return NotFound();
            }

            return historial_Orden;
        }

        // PUT: api/Historial_Orden/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{orden}/{fase}")]
        public async Task<IActionResult> PutHistorial_Orden(string orden, int fase, Historial_Orden historial_Orden)
        {
            if (orden != historial_Orden.orden && fase != historial_Orden.fase)
            {
                return BadRequest();
            }

            _context.Entry(historial_Orden).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Historial_OrdenExists(orden, fase))
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

        // POST: api/Historial_Orden
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Historial_Orden>> PostHistorial_Orden(Historial_Orden historial_Orden)
        {
          if (_context.Historial_Orden == null)
          {
              return Problem("Entity set 'FicusContext.Historial_Orden'  is null.");
          }
            _context.Historial_Orden.Add(historial_Orden);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (Historial_OrdenExists(historial_Orden.orden, historial_Orden.fase))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetHistorial_Orden", new { id = historial_Orden.orden }, historial_Orden);
        }

        // DELETE: api/Historial_Orden/5
        [HttpDelete("{orden}/{fase}")]
        public async Task<IActionResult> DeleteHistorial_Orden(string orden, int fase)
        {
            if (_context.Historial_Orden == null)
            {
                return NotFound();
            }
            var historial_Orden = await _context.Historial_Orden.FindAsync(orden, fase);
            if (historial_Orden == null)
            {
                return NotFound();
            }

            _context.Historial_Orden.Remove(historial_Orden);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool Historial_OrdenExists(string orden, int fase)
        {
            return (_context.Historial_Orden?.Any(e => e.orden == orden &&  e.fase == fase)).GetValueOrDefault();
        }
    }
}
