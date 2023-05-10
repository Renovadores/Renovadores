using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using FicusApp.Models;
using System.Linq;

namespace FicusApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClienteController : ControllerBase
    {
        private readonly FicusDbContext _context;

        public ClienteController(FicusDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("GetClientes")]
        public async Task<IActionResult> GetClientes()
        {
            List<Cliente> clientes = _context.Clientes.OrderByDescending(c => c.Id).ToList();
            return Ok(clientes);
        }

        [HttpPost]
        [Route("AddCliente")]
        public async Task<IActionResult> AddCliente([FromBody] Cliente request)
        {
            await _context.Clientes.AddAsync(request);
            await _context.SaveChangesAsync();
            return Ok();
        }
        public int toIntegerFamilias(string familia)
        {
            if (familia == "Costas")
            {
                return 0;
            }else if(familia == "Páramos")
            {
                return 1;
            } else if (familia == "Bosques")
            {
                return 2;
            }
        }
    }
}
