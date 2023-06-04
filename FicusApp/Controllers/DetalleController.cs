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
    public class DetalleController : ControllerBase
    {
        private readonly FicusContext _context;

        public DetalleController(FicusContext context)
        {
            _context = context;
        }

        // GET: api/Detalle
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Detalle>>> GetDetalle()
        {
            if (_context.Detalle == null)
            {
                return NotFound();
            }
            return await _context.Detalle.ToListAsync();
        }

        // GET: api/Detalle/5
        [HttpGet("{id_reserva}/{producto}")]
        public async Task<ActionResult<Detalle>> GetDetalle(string id_reserva, string producto)
        {
            if (_context.Detalle == null)
            {
                return NotFound();
            }
            var detalle = await _context.Detalle.FindAsync(id_reserva, producto);

            if (detalle == null)
            {
                return NotFound();
            }

            return detalle;
        }

        // PUT: api/Detalle/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id_reserva}/{producto}")]
        public async Task<IActionResult> PutDetalle(string id_reserva, string producto, Detalle detalle)
        {
            if (id_reserva != detalle.id_reserva && producto != detalle.producto)
            {
                return BadRequest();
            }

            _context.Entry(detalle).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DetalleExists(id_reserva, producto))
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

        // POST: api/Detalle
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Detalle>> PostDetalle(Detalle detalle)
        {
            if (_context.Detalle == null)
            {
                return Problem("Entity set 'FicusContext.Detalle'  is null.");
            }
            _context.Detalle.Add(detalle);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (DetalleExists(detalle.id_reserva, detalle.producto))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetDetalle", new { id = detalle.id_reserva }, detalle);
        }

        // DELETE: api/Detalle/5
        [HttpDelete("{id_reserva}/{producto}")]
        public async Task<IActionResult> DeleteDetalle(string id_reserva, string producto)
        {
            if (_context.Detalle == null)
            {
                return NotFound();
            }
            var detalle = await _context.Detalle.FindAsync(id_reserva, producto);
            if (detalle == null)
            {
                return NotFound();
            }

            _context.Detalle.Remove(detalle);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool DetalleExists(string id_reserva, string producto)
        {
            return (_context.Detalle?.Any(e => e.id_reserva == id_reserva && e.producto == producto)).GetValueOrDefault();
        }
    }
}
