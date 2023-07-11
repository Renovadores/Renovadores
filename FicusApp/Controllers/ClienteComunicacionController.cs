using FicusApp.Models;
using FicusApp.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FicusApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClienteComunicacionController : ControllerBase
    {
        private readonly IClientMediaService _clientMediaService;

        public ClienteComunicacionController(IClientMediaService clientMediaService)
        {
            _clientMediaService = clientMediaService;
        }

        [Authorize]
        [HttpGet]
        [Route("GetMedia/{id}")]
        public Task<IActionResult> GetMedia(int id)
        {
            List<ClienteComunicacion> clienteMedios = _clientMediaService.GetMedia(id);
            List<string> medios = new();
            for (int i = 0; i < clienteMedios.Count; i++)
            {
                medios.Add(clienteMedios[i].MedioId);
            }
            return Task.FromResult<IActionResult>(Ok(medios));
        }

        [Authorize]
        [HttpPost]
        [Route("AddClientMedia")]
        public async Task<IActionResult> AddClientMedia([FromBody] ClienteComunicacion request)
        {
            await _clientMediaService.AddMedia(request);
            return Ok();
        }

        [Authorize]
        [HttpDelete]
        [Route("DeleteClientMedia")]
        public async Task<IActionResult> DeleteClientMedia([FromBody] ClienteComunicacion request)
        {
            await _clientMediaService.DeleteClientMedia(request);
            return Ok();
        }

    }
}
