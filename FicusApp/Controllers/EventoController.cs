﻿using FicusApp.Models;
using FicusApp.Pages;
using FicusApp.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FicusApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventoController : ControllerBase
    {
        private readonly EventService _eventService;

        public EventoController(EventService eventService)
        {
            _eventService = eventService;
        }

        [HttpGet]
        [Route("GetEventos")]
        public async Task<IActionResult> GetEventos()
        {
            List<Evento> eventos =  await _eventService.GetEventos();
            return Ok(eventos);
        }

        [HttpPost]
        [Route("AddEvento")]
        public async Task<IActionResult> AddEvento([FromBody] Evento request)
        {
            int code = await _eventService.AddEvento(request);
            return Ok();
        }

        [HttpGet]
        [Route("FindEvento/{name}")]
        public async Task<IActionResult> FindEvento(string name)
        {
            bool exists = await _eventService.FindEvento(name);
            Exist response = new()
            {
                exist = exists
            };
            return Ok(response);
        }

        [HttpGet]
        [Route("GetEventId/{name}")]
        public async Task<IActionResult> GetEventId(string name)
        {
            int eventId = await _eventService.GetEventId(name);
            Id response = new()
            {
                id = eventId
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
