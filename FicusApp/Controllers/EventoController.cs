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
        public Task<IActionResult> GetEventos()
        {
            List<Evento> eventos = _eventService.GetEventos();
            return Task.FromResult<IActionResult>(Ok(eventos));
        }

        [Authorize]
        [HttpPost]
        [Route("AddEvento")]
        public async Task<IActionResult> AddEvento([FromBody] Evento request)
        {
            await _eventService.AddEvento(request);
            return Ok();
        }

        [Authorize]
        [HttpGet]
        [Route("FindEvento/{name}")]
        public Task<IActionResult> FindEvento(string name)
        {
            bool r = _eventService.FindEvento(name);
            Exist response = new()
            {
                exist = r
            };
            return Task.FromResult<IActionResult>(Ok(response));
        }

        [Authorize]
        [HttpGet]
        [Route("GetEventId/{name}")]
        public Task<IActionResult> GetEventId(string name)
        {
            int id = _eventService.GetEventId(name);
            Id response = new()
            {
                id = id
            };
            return Task.FromResult<IActionResult>(Ok(response));
        }

        [Authorize]
        [HttpPut]
        [Route("EditDescription")]
        public Task<IActionResult> EditDescription([FromBody] Evento evento)
        {
            _eventService.EditDescription(evento);
            return Task.FromResult<IActionResult>(Ok());
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
