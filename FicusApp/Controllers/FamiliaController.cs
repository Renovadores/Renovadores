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
    public class FamiliaController : ControllerBase
    {
        private readonly FicusContext _context;

        public FamiliaController(FicusContext context)
        {
            _context = context;
        }

        // GET: api/Familia
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Familia>>> GetFamilia()
        {
          if (_context.Familia == null)
          {
              return NotFound();
          }
            return await _context.Familia.ToListAsync();
        }

        // GET: api/Familia/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Familia>> GetFamilia(int id)
        {
          if (_context.Familia == null)
          {
              return NotFound();
          }
            var familia = await _context.Familia.FindAsync(id);

            if (familia == null)
            {
                return NotFound();
            }

            return familia;
        }

        // PUT: api/Familia/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFamilia(int id, Familia familia)
        {
            if (id != familia.FamiliaId)
            {
                return BadRequest();
            }

            _context.Entry(familia).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FamiliaExists(id))
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

        // POST: api/Familia
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Familia>> PostFamilia(Familia familia)
        {
          if (_context.Familia == null)
          {
              return Problem("Entity set 'FicusContext.Familia'  is null.");
          }
            _context.Familia.Add(familia);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (FamiliaExists(familia.FamiliaId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetFamilia", new { id = familia.FamiliaId }, familia);
        }

        // DELETE: api/Familia/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFamilia(int id)
        {
            if (_context.Familia == null)
            {
                return NotFound();
            }
            var familia = await _context.Familia.FindAsync(id);
            if (familia == null)
            {
                return NotFound();
            }

            _context.Familia.Remove(familia);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool FamiliaExists(int id)
        {
            return (_context.Familia?.Any(e => e.FamiliaId == id)).GetValueOrDefault();
        }
    }
}
