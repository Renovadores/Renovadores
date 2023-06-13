using FicusApp.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FicusApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        private readonly FicusContext _context;

        public UsuarioController(FicusContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("GetUsers")]
        public async Task<IActionResult> GetUsers()
        {
            List<Usuario> usuarios = _context.Usuario.ToList();
            return Ok(usuarios);
        }

        [HttpGet]
        [Route("GetUser/{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            Usuario usuario = _context.Usuario.Find(id);
            return Ok(usuario);
        }
    }
}
