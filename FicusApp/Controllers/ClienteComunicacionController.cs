using FicusApp.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FicusApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClienteComunicacionController : ControllerBase
    {
        private readonly FicusContext _context;

        public ClienteComunicacionController(FicusContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("GetMedia/{id}")]
        public async Task<IActionResult> GetMedia(int id)
        {
            List<ClienteComunicacion> cliente_medios = _context.ClienteComunicacion
                                                       .Where(s => s.ClienteId == id).ToList();
            List<string> medios = new();
            for (int i = 0; i < cliente_medios.Count; i++)
            {
                medios.Add(cliente_medios[i].MedioId);
            }
            return Ok(medios);
        }

        [HttpPost]
        [Route("AddClientMedia")]
        public async Task<IActionResult> AddClientMedia([FromBody] ClienteComunicacion request)
        {
            await _context.ClienteComunicacion.AddAsync(request);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpDelete]
        [Route("DeleteClientMedia")]
        public async Task<IActionResult> DeleteClientMedia([FromBody] ClienteComunicacion request)
        {
            ClienteComunicacion clienteMedio = _context.ClienteComunicacion.Where(s => 
                                                s.ClienteId == request.ClienteId 
                                                && s.MedioId == request.MedioId).FirstOrDefault();
            _context.ClienteComunicacion.Remove(clienteMedio);
            _context.SaveChanges();
            return Ok();
        }

    }
}
