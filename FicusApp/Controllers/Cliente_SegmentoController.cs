using FicusApp.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Nodes;

namespace FicusApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Cliente_SegmentoController : ControllerBase
    {
        private readonly FicusDbContext _context;

        public Cliente_SegmentoController(FicusDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("GetSegments/{id}")]
        public async Task<IActionResult> GetSegments(int id)
        {
            List<Cliente_Segmento> cliente_segmentos = _context.Cliente_Segmento
                                                       .Where(s => s.Cliente == id).ToList();
            return Ok(cliente_segmentos);
        }

        [HttpPost]
        [Route("AddSegment")]
        public async Task<IActionResult> AddSegment([FromBody] Cliente_Segmento request)
        {
            await _context.Cliente_Segmento.AddAsync(request);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
