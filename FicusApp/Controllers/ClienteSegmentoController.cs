using FicusApp.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Nodes;

namespace FicusApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClienteSegmentoController : ControllerBase
    {
        private readonly FicusContext _context;

        public ClienteSegmentoController(FicusContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("GetSegments/{id}")]
        public async Task<IActionResult> GetSegments(int id)
        {
            List<ClienteSegmento> cliente_segmentos = _context.ClienteSegmento
                                                       .Where(s => s.ClienteId == id).ToList();
            List<string> segmentos = new();
            for (int i = 0; i < cliente_segmentos.Count; i++)
            {
                segmentos.Add(cliente_segmentos[i].SegmentoId);
            }
            return Ok(segmentos);
        }

        [HttpPost]
        [Route("AddSegment")]
        public async Task<IActionResult> AddSegment([FromBody] ClienteSegmento request)
        {
            await _context.ClienteSegmento.AddAsync(request);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpDelete]
        [Route("DeleteClient_Segment")] 
        public async Task<IActionResult> DeleteClient_Segment([FromBody] ClienteSegmento request)
        {
            ClienteSegmento clienteSegmento = _context.ClienteSegmento.Where(s =>
                                                s.ClienteId == request.ClienteId
                                                && s.SegmentoId == request.SegmentoId).FirstOrDefault();
            _context.ClienteSegmento.Remove(clienteSegmento);
            _context.SaveChanges();
            return Ok();
        }

    }
}
