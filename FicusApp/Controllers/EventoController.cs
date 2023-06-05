using FicusApp.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FicusApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventoController : ControllerBase
    {
        private readonly FicusDbContext _context;

        public EventoController(FicusDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("GetEventos")]
        public async Task<IActionResult> GetEventos()
        {
            List<Evento> eventos = _context.Evento.OrderByDescending(c => c.IdEvento).ToList();
            return Ok(eventos);
        }

        [HttpPost]
        [Route("AddEvento")]
        public async Task<IActionResult> AddCliente([FromBody] Evento request)
        {
            await _context.Evento.AddAsync(request);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
