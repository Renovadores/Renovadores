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
    public class FaseController : ControllerBase
    {
        private readonly FicusContext _context;

        public FaseController(FicusContext context)
        {
            _context = context;
        }

        // GET: api/Fase
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Fase>>> GetFase()
        {
          if (_context.Fase == null)
          {
              return NotFound();
          }
            return await _context.Fase.ToListAsync();
        }

        // GET: api/Fase/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Fase>> GetFase(int id)
        {
          if (_context.Fase == null)
          {
              return NotFound();
          }
            var fase = await _context.Fase.FindAsync(id);

            if (fase == null)
            {
                return NotFound();
            }

            return fase;
        }

        // PUT: api/Fase/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFase(int id, Fase fase)
        {
            if (id != fase.FaseId)
            {
                return BadRequest();
            }

            _context.Entry(fase).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FaseExists(id))
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

        // POST: api/Fase
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Fase>> PostFase(Fase fase)
        {
          if (_context.Fase == null)
          {
              return Problem("Entity set 'FicusContext.Fase'  is null.");
          }
            _context.Fase.Add(fase);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (FaseExists(fase.FaseId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetFase", new { id = fase.FaseId }, fase);
        }

        // DELETE: api/Fase/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFase(int id)
        {
            if (_context.Fase == null)
            {
                return NotFound();
            }
            var fase = await _context.Fase.FindAsync(id);
            if (fase == null)
            {
                return NotFound();
            }

            _context.Fase.Remove(fase);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool FaseExists(int id)
        {
            return (_context.Fase?.Any(e => e.FaseId == id)).GetValueOrDefault();
        }
    }
}
