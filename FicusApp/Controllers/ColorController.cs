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
    public class ColorController : ControllerBase
    {
        private readonly FicusContext _context;

        public ColorController(FicusContext context)
        {
            _context = context;
        }

        // GET: api/Color
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Color>>> GetColor()
        {
          if (_context.Color == null)
          {
              return NotFound();
          }
            return await _context.Color.ToListAsync();
        }

        // GET: api/Color/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Color>> GetColor(int id)
        {
          if (_context.Color == null)
          {
              return NotFound();
          }
            var color = await _context.Color.FindAsync(id);

            if (color == null)
            {
                return NotFound();
            }

            return color;
        }

        // PUT: api/Color/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutColor(int id, Color color)
        {
            if (id != color.id_color)
            {
                return BadRequest();
            }

            _context.Entry(color).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ColorExists(id))
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

        // POST: api/Color
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Color>> PostColor(Color color)
        {
          if (_context.Color == null)
          {
              return Problem("Entity set 'FicusContext.Color'  is null.");
          }
            _context.Color.Add(color);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (ColorExists(color.id_color))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetColor", new { id = color.id_color }, color);
        }

        // DELETE: api/Color/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteColor(int id)
        {
            if (_context.Color == null)
            {
                return NotFound();
            }
            var color = await _context.Color.FindAsync(id);
            if (color == null)
            {
                return NotFound();
            }

            _context.Color.Remove(color);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ColorExists(int id)
        {
            return (_context.Color?.Any(e => e.id_color == id)).GetValueOrDefault();
        }
    }
}
