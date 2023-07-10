using FicusApp.Models;
using FicusApp.Services;
using Microsoft.AspNetCore.Authorization;
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
        private readonly IClientSegmentService _clientSegmentService;

        public ClienteSegmentoController(IClientSegmentService clientSegmentService)
        {
            _clientSegmentService = clientSegmentService;
        }

        [Authorize]
        [HttpGet]
        [Route("GetSegments/{id}")]
        public Task<IActionResult> GetSegments(int id)
        {
            List<ClienteSegmento> clienteSegmentos = _clientSegmentService.GetSegments(id);
            List<string> segmentos = new();
            for (int i = 0; i < clienteSegmentos.Count; i++)
            {
                segmentos.Add(clienteSegmentos[i].SegmentoId);
            }
            return Task.FromResult<IActionResult>(Ok(segmentos));
        }

        [Authorize]
        [HttpPost]
        [Route("AddSegment")]
        public async Task<IActionResult> AddSegment([FromBody] ClienteSegmento request)
        {
            int code = await _clientSegmentService.AddSegment(request);
            return Ok();
        }

        [Authorize]
        [HttpDelete]
        [Route("DeleteClientSegment")] 
        public async Task<IActionResult> DeleteClientSegment([FromBody] ClienteSegmento request)
        {
            int code = await _clientSegmentService.DeleteClientSegment(request);
            return Ok();
        }

    }
}
