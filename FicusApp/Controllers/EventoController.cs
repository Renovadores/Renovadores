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
    public class EventoController : ControllerBase
    {
        private readonly FicusContext _context;

        public EventoController(FicusContext context)
        {
            _context = context;
        }

        // GET: api/Evento
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Evento>>> GetEvento()
        {
          if (_context.Evento == null)
          {
              return NotFound();
          }
            return await _context.Evento.ToListAsync();
        }

        // GET: api/Evento/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Evento>> GetEvento(int id)
        {
          if (_context.Evento == null)
          {
              return NotFound();
          }
            var evento = await _context.Evento.FindAsync(id);

            if (evento == null)
            {
                return NotFound();
            }

            return evento;
        }

        // PUT: api/Evento/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEvento(int id, Evento evento)
        {
            if (id != evento.id_evento)
            {
                return BadRequest();
            }

            _context.Entry(evento).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EventoExists(id))
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

        // POST: api/Evento
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Evento>> PostEvento(Evento evento)
        {
          if (_context.Evento == null)
          {
              return Problem("Entity set 'FicusContext.Evento'  is null.");
          }
            _context.Evento.Add(evento);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (EventoExists(evento.id_evento))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetEvento", new { id = evento.id_evento }, evento);
        }

        // DELETE: api/Evento/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEvento(int id)
        {
            if (_context.Evento == null)
            {
                return NotFound();
            }
            var evento = await _context.Evento.FindAsync(id);
            if (evento == null)
            {
                return NotFound();
            }

            _context.Evento.Remove(evento);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool EventoExists(int id)
        {
            return (_context.Evento?.Any(e => e.id_evento == id)).GetValueOrDefault();
        }
    }
}
