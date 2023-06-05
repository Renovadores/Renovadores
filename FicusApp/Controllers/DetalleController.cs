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
        [HttpGet("{OrdenId}/{ProductoId}")]
        public async Task<ActionResult<Detalle>> GetDetalle(int OrdenId, string ProductoId)
        {
            if (_context.Detalle == null)
            {
                return NotFound();
            }
            var detalle = await _context.Detalle.FindAsync(OrdenId, ProductoId);

            if (detalle == null)
            {
                return NotFound();
            }

            return detalle;
        }

        // PUT: api/Detalle/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{OrdenId}/{ProductoId}")]
        public async Task<IActionResult> PutDetalle(int OrdenId, string ProductoId, Detalle detalle)
        {
            if (OrdenId != detalle.OrdenId && ProductoId != detalle.ProductoId)
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
                if (!DetalleExists(OrdenId, ProductoId))
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
                if (DetalleExists(detalle.OrdenId, detalle.ProductoId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetDetalle", new { id = detalle.OrdenId }, detalle);
        }

        // DELETE: api/Detalle/5
        [HttpDelete("{OrdenId}/{ProductoId}")]
        public async Task<IActionResult> DeleteDetalle(int OrdenId, string ProductoId)
        {
            if (_context.Detalle == null)
            {
                return NotFound();
            }
            var detalle = await _context.Detalle.FindAsync(OrdenId, ProductoId);
            if (detalle == null)
            {
                return NotFound();
            }

            _context.Detalle.Remove(detalle);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool DetalleExists(int OrdenId, string ProductoId)
        {
            return (_context.Detalle?.Any(e => e.OrdenId == OrdenId && e.ProductoId == ProductoId)).GetValueOrDefault();
        }
    }
}
