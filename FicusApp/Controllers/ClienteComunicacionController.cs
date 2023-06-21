using FicusApp.Models;
using FicusApp.Services;
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

        [HttpGet]
        [Route("GetMedia/{id}")]
        public async Task<IActionResult> GetMedia(int id)
        {
            List<ClienteComunicacion> clienteMedios = _clientMediaService.GetMedia(id);
            List<string> medios = new();
            for (int i = 0; i < clienteMedios.Count; i++)
            {
                medios.Add(clienteMedios[i].MedioId);
            }
            return Ok(medios);
        }

        [HttpPost]
        [Route("AddClientMedia")]
        public async Task<IActionResult> AddClientMedia([FromBody] ClienteComunicacion request)
        {
            int code = await _clientMediaService.AddMedia(request);
            return Ok();
        }

        [HttpDelete]
        [Route("DeleteClientMedia")]
        public async Task<IActionResult> DeleteClientMedia([FromBody] ClienteComunicacion request)
        {
            int code = await _clientMediaService.DeleteClientMedia(request);
            return Ok();
        }

    }
}
