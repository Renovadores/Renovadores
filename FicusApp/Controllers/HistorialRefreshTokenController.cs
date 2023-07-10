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
        public Task<IActionResult> GetHistorialToken(int UsuarioId)
        {
            HistorialRefreshToken historialToken = _context.HistorialRefreshToken
                                         .Where(h => h.UsuarioId == UsuarioId).Single();
            return Task.FromResult<IActionResult>(Ok(historialToken));
        }

    }
}
