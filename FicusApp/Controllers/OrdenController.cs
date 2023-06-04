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
    public class OrdenController : ControllerBase
    {
        private readonly FicusContext _context;

        public OrdenController(FicusContext context)
        {
            _context = context;
        }

        // GET: api/Orden
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Orden>>> GetOrden()
        {
          if (_context.Orden == null)
          {
              return NotFound();
          }
            return await _context.Orden.ToListAsync();
        }

        // GET: api/Orden/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Orden>> GetOrden(string id)
        {
          if (_context.Orden == null)
          {
              return NotFound();
          }
            var orden = await _context.Orden.FindAsync(id);

            if (orden == null)
            {
                return NotFound();
            }

            return orden;
        }

        // PUT: api/Orden/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrden(string id, Orden orden)
        {
            if (id != orden.id_orden)
            {
                return BadRequest();
            }

            _context.Entry(orden).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrdenExists(id))
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

        // POST: api/Orden
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Orden>> PostOrden(Orden orden)
        {
          if (_context.Orden == null)
          {
              return Problem("Entity set 'FicusContext.Orden'  is null.");
          }
            _context.Orden.Add(orden);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (OrdenExists(orden.id_orden))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetOrden", new { id = orden.id_orden }, orden);
        }

        // DELETE: api/Orden/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrden(string id)
        {
            if (_context.Orden == null)
            {
                return NotFound();
            }
            var orden = await _context.Orden.FindAsync(id);
            if (orden == null)
            {
                return NotFound();
            }

            _context.Orden.Remove(orden);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool OrdenExists(string id)
        {
            return (_context.Orden?.Any(e => e.id_orden == id)).GetValueOrDefault();
        }
    }
}
