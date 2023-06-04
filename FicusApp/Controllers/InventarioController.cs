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
    public class InventarioController : ControllerBase
    {
        private readonly FicusContext _context;

        public InventarioController(FicusContext context)
        {
            _context = context;
        }

        // GET: api/Inventario
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Inventario>>> GetInventario()
        {
          if (_context.Inventario == null)
          {
              return NotFound();
          }
            return await _context.Inventario.ToListAsync();
        }

        // GET: api/Inventario/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Inventario>> GetInventario(string id)
        {
          if (_context.Inventario == null)
          {
              return NotFound();
          }
            var inventario = await _context.Inventario.FindAsync(id);

            if (inventario == null)
            {
                return NotFound();
            }

            return inventario;
        }

        // PUT: api/Inventario/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutInventario(string id, Inventario inventario)
        {
            if (id != inventario.producto)
            {
                return BadRequest();
            }

            _context.Entry(inventario).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!InventarioExists(id))
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

        // POST: api/Inventario
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Inventario>> PostInventario(Inventario inventario)
        {
          if (_context.Inventario == null)
          {
              return Problem("Entity set 'FicusContext.Inventario'  is null.");
          }
            _context.Inventario.Add(inventario);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (InventarioExists(inventario.producto))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetInventario", new { id = inventario.producto }, inventario);
        }

        // DELETE: api/Inventario/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteInventario(string id)
        {
            if (_context.Inventario == null)
            {
                return NotFound();
            }
            var inventario = await _context.Inventario.FindAsync(id);
            if (inventario == null)
            {
                return NotFound();
            }

            _context.Inventario.Remove(inventario);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool InventarioExists(string id)
        {
            return (_context.Inventario?.Any(e => e.producto == id)).GetValueOrDefault();
        }
    }
}
