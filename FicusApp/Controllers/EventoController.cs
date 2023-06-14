using FicusApp.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

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

        [HttpGet]
        [Route("GetEventos")]
        public async Task<IActionResult> GetEventos()
        {
            List<Evento> eventos = _context.Evento.OrderByDescending(c => c.EventoId).ToList();
            return Ok(eventos);
        }

        [HttpPost]
        [Route("AddEvento")]
        public async Task<IActionResult> AddEvento([FromBody] Evento request)
        {
            request.EventoId = _context.Evento.Count() + 1;
            await _context.Evento.AddAsync(request);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpGet]
        [Route("FindEvento/{name}")]
        public async Task<IActionResult> FindEvento(string name)
        {
            bool r = _context.Evento.Where(e => e.NombreEvento == name).FirstOrDefault() != null;
            Exist response = new()
            {
                exist = r
            };
            return Ok(response);
        }

        [HttpGet]
        [Route("GetEventId/{name}")]
        public async Task<IActionResult> GetEventId(string name)
        {
            int r = _context.Evento.Where(e => e.NombreEvento == name).FirstOrDefault().EventoId;
            Id response = new()
            {
                id = r
            };
            return Ok(response);
        }
    }
    public class Exist
    {
        public bool exist { get; set; }
    }

    public class Id
    {
        public int id { get; set; }
    }
}
