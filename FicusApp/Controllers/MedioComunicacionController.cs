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
    public class MedioComunicacionController : ControllerBase
    {
        private readonly FicusContext _context;

        public MedioComunicacionController(FicusContext context)
        {
            _context = context;
        }

        // GET: api/MedioComunicacion
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MedioComunicacion>>> GetMedioComunicacion()
        {
          if (_context.MedioComunicacion == null)
          {
              return NotFound();
          }
            return await _context.MedioComunicacion.ToListAsync();
        }

        // GET: api/MedioComunicacion/5
        [HttpGet("{id}")]
        public async Task<ActionResult<MedioComunicacion>> GetMedioComunicacion(string id)
        {
          if (_context.MedioComunicacion == null)
          {
              return NotFound();
          }
            var medioComunicacion = await _context.MedioComunicacion.FindAsync(id);

            if (medioComunicacion == null)
            {
                return NotFound();
            }

            return medioComunicacion;
        }

        // PUT: api/MedioComunicacion/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMedioComunicacion(string id, MedioComunicacion medioComunicacion)
        {
            if (id != medioComunicacion.MedioId)
            {
                return BadRequest();
            }

            _context.Entry(medioComunicacion).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MedioComunicacionExists(id))
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

        // POST: api/MedioComunicacion
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<MedioComunicacion>> PostMedioComunicacion(MedioComunicacion medioComunicacion)
        {
          if (_context.MedioComunicacion == null)
          {
              return Problem("Entity set 'FicusContext.MedioComunicacion'  is null.");
          }
            _context.MedioComunicacion.Add(medioComunicacion);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (MedioComunicacionExists(medioComunicacion.MedioId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetMedioComunicacion", new { id = medioComunicacion.MedioId }, medioComunicacion);
        }

        // DELETE: api/MedioComunicacion/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMedioComunicacion(string id)
        {
            if (_context.MedioComunicacion == null)
            {
                return NotFound();
            }
            var medioComunicacion = await _context.MedioComunicacion.FindAsync(id);
            if (medioComunicacion == null)
            {
                return NotFound();
            }

            _context.MedioComunicacion.Remove(medioComunicacion);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MedioComunicacionExists(string id)
        {
            return (_context.MedioComunicacion?.Any(e => e.MedioId == id)).GetValueOrDefault();
        }
    }
}
