using FicusApp.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FicusApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Cliente_ComunicacionController : ControllerBase
    {
        private readonly FicusDbContext _context;

        public Cliente_ComunicacionController(FicusDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("GetMedia/{id}")]
        public async Task<IActionResult> GetMedia(int id)
        {
            List<Cliente_Comunicacion> cliente_medios = _context.Cliente_Comunicacion
                                                       .Where(s => s.Cliente == id).ToList();
            List<string> medios = new();
            for (int i = 0; i < cliente_medios.Count; i++)
            {
                medios.Add(cliente_medios[i].Medio);
            }
            return Ok(medios);
        }

        [HttpPost]
        [Route("AddClientMedia")]
        public async Task<IActionResult> AddClientMedia([FromBody] Cliente_Comunicacion request)
        {
            await _context.Cliente_Comunicacion.AddAsync(request);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpDelete]
        [Route("DeleteClientMedia")]
        public async Task<IActionResult> DeleteClientMedia([FromBody] Cliente_Comunicacion request)
        {
            _context.Cliente_Comunicacion.Remove(request);
            _context.SaveChanges();
            return Ok();
        }

    }
}
