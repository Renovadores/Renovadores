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
    public class ProductoController : ControllerBase
    {
        private readonly FicusContext _context;

        public ProductoController(FicusContext context)
        {
            _context = context;
        }

        // GET: api/Producto
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Producto>>> GetProducto()
        {
          if (_context.Producto == null)
          {
              return NotFound();
          }
            return await _context.Producto.ToListAsync();
        }

        // GET: api/Producto/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Producto>> GetProducto(string id)
        {
          if (_context.Producto == null)
          {
              return NotFound();
          }
            var producto = await _context.Producto.FindAsync(id);

            if (producto == null)
            {
                return NotFound();
            }

            return producto;
        }

        // PUT: api/Producto/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProducto(string id, Producto producto)
        {
            if (id != producto.sku)
            {
                return BadRequest();
            }

            _context.Entry(producto).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductoExists(id))
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

        // POST: api/Producto
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Producto>> PostProducto(Producto producto)
        {
          if (_context.Producto == null)
          {
              return Problem("Entity set 'FicusContext.Producto'  is null.");
          }
            _context.Producto.Add(producto);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (ProductoExists(producto.sku))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetProducto", new { id = producto.sku }, producto);
        }

        // DELETE: api/Producto/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProducto(string id)
        {
            if (_context.Producto == null)
            {
                return NotFound();
            }
            var producto = await _context.Producto.FindAsync(id);
            if (producto == null)
            {
                return NotFound();
            }

            _context.Producto.Remove(producto);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProductoExists(string id)
        {
            return (_context.Producto?.Any(e => e.sku == id)).GetValueOrDefault();
        }
    }
}
