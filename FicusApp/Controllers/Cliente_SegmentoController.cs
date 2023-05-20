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
            List<string> segmentos = new();
            for (int i = 0; i < cliente_segmentos.Count; i++)
            {
                segmentos.Add(cliente_segmentos[i].Segmento);
            }
            return Ok(segmentos);
        }

        [HttpPost]
        [Route("AddSegment")]
        public async Task<IActionResult> AddSegment([FromBody] Cliente_Segmento request)
        {
            await _context.Cliente_Segmento.AddAsync(request);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpDelete]
        [Route("DeleteClient_Segment")]
        public async Task<IActionResult> DeleteClient_Segment([FromBody] Cliente_Segmento request)
        {
            _context.Cliente_Segmento.Remove(request);
            _context.SaveChanges();
            return Ok();
        }

    }
}
