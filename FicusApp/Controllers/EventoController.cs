using FicusApp.Models;
using FicusApp.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FicusApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventoController : ControllerBase
    {
        private readonly IEventService _eventService;

        public EventoController(IEventService eventService)
        {
            _eventService = eventService;
        }

        [Authorize]
        [HttpGet]
        [Route("GetEventos")]
        public async Task<IActionResult> GetEventos()
        {
            List<Evento> eventos = _eventService.GetEventos();
            return Ok(eventos);
        }

        [Authorize]
        [HttpPost]
        [Route("AddEvento")]
        public async Task<IActionResult> AddEvento([FromBody] Evento request)
        {
            int code = await _eventService.AddEvento(request);
            return Ok();
        }

        [Authorize]
        [HttpGet]
        [Route("FindEvento/{name}")]
        public async Task<IActionResult> FindEvento(string name)
        {
            bool r = _eventService.FindEvento(name);
            Exist response = new()
            {
                exist = r
            };
            return Ok(response);
        }

        [Authorize]
        [HttpGet]
        [Route("GetEventId/{name}")]
        public async Task<IActionResult> GetEventId(string name)
        {
            int id = _eventService.GetEventId(name);
            Id response = new()
            {
                id = id
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
