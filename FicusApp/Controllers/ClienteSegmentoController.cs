using FicusApp.Models;
using FicusApp.Services;
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

        [HttpGet]
        [Route("GetSegments/{id}")]
        public async Task<IActionResult> GetSegments(int id)
        {
            List<ClienteSegmento> clienteSegmentos = _clientSegmentService.GetSegments(id);
            List<string> segmentos = new();
            for (int i = 0; i < clienteSegmentos.Count; i++)
            {
                segmentos.Add(clienteSegmentos[i].SegmentoId);
            }
            return Ok(segmentos);
        }

        [HttpPost]
        [Route("AddSegment")]
        public async Task<IActionResult> AddSegment([FromBody] ClienteSegmento request)
        {
            int code = await _clientSegmentService.AddSegment(request);
            return Ok();
        }

        [HttpDelete]
        [Route("DeleteClient_Segment")] 
        public async Task<IActionResult> DeleteClient_Segment([FromBody] ClienteSegmento request)
        {
            int code = await _clientSegmentService.DeleteClientSegment(request);
            return Ok();
        }

    }
}
