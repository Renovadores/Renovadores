using FicusApp.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FicusApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HistorialRefreshTokenController : ControllerBase
    {
        private readonly FicusContext _context;

        public HistorialRefreshTokenController(FicusContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("GetHistorialToken/{UsuarioId}")]
        public async Task<IActionResult> GetHistorialToken(int UsuarioId)
        {
            var historialToken = _context.HistorialRefreshToken
                                                        .Where(h => h.UsuarioId == UsuarioId)
                                                        .OrderByDescending(h => h.FechaCreacion)
                                                        .Take(1).SingleOrDefault();
            return Ok(historialToken);
        }

    }
}
