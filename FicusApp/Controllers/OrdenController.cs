using FicusApp.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.InteropServices.JavaScript;

namespace FicusApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdenController : ControllerBase
    {
        private readonly FicusDbContext _context;

        public OrdenController(FicusDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("GetOrders")]
        public async Task<IActionResult> GetOrders()
        {
            List<Orden> ordenes = _context.Orden.ToList();
            return Ok(ordenes);
        }

        [HttpGet]
        [Route("GetNewCode")]
        public async Task<IActionResult> GetNewCode()
        {
            string code = "OR-";
            string number = (_context.Orden.Count() + 1).ToString();
            number = number.PadLeft(4, '0');
            code += number;
            NewCode response = new()
            {
                Id = code
            };
            return Ok(response);
        }

        [HttpPost]
        [Route("PostOrder")]
        public async Task<IActionResult> PostOrder([FromBody] Orden request)
        {
            await _context.Orden.AddAsync(request);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }

    public class NewCode
    {
        public string Id { get; set; }
    }
}
