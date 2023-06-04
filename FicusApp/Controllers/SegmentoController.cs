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
    public class SegmentoController : ControllerBase
    {
        private readonly FicusContext _context;

        public SegmentoController(FicusContext context)
        {
            _context = context;
        }

        // GET: api/Segmento
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Segmento>>> GetSegmento()
        {
          if (_context.Segmento == null)
          {
              return NotFound();
          }
            return await _context.Segmento.ToListAsync();
        }

        // GET: api/Segmento/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Segmento>> GetSegmento(string id)
        {
          if (_context.Segmento == null)
          {
              return NotFound();
          }
            var segmento = await _context.Segmento.FindAsync(id);

            if (segmento == null)
            {
                return NotFound();
            }

            return segmento;
        }

        // PUT: api/Segmento/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSegmento(string id, Segmento segmento)
        {
            if (id != segmento.id_segmento)
            {
                return BadRequest();
            }

            _context.Entry(segmento).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SegmentoExists(id))
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

        // POST: api/Segmento
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Segmento>> PostSegmento(Segmento segmento)
        {
          if (_context.Segmento == null)
          {
              return Problem("Entity set 'FicusContext.Segmento'  is null.");
          }
            _context.Segmento.Add(segmento);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (SegmentoExists(segmento.id_segmento))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetSegmento", new { id = segmento.id_segmento }, segmento);
        }

        // DELETE: api/Segmento/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSegmento(string id)
        {
            if (_context.Segmento == null)
            {
                return NotFound();
            }
            var segmento = await _context.Segmento.FindAsync(id);
            if (segmento == null)
            {
                return NotFound();
            }

            _context.Segmento.Remove(segmento);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SegmentoExists(string id)
        {
            return (_context.Segmento?.Any(e => e.id_segmento == id)).GetValueOrDefault();
        }
    }
}
