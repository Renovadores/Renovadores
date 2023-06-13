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
        private readonly FicusContext _context;

        public ClienteController(FicusContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("GetClientes")]
        public async Task<IActionResult> GetClientes()
        {
            List<Cliente> clientes = _context.Cliente.OrderByDescending(c => c.ClienteId).ToList();
            return Ok(clientes);
        }

        [HttpGet]
        [Route("GetNewId")]
        public async Task<IActionResult> GetNewId()
        {
            newId id = new newId();
            id.Id = _context.Cliente.Count() + 1;
            return Ok(id);
        }

        [HttpGet]
        [Route("GetCliente/{ID_Cliente}")]
        public async Task<IActionResult> GetCliente(int ID_Cliente)
        {
            Cliente cliente = await _context.Cliente.FindAsync(ID_Cliente);

            return Ok(cliente);
        }

        [HttpPost]
        [Route("AddCliente")]
        public async Task<IActionResult> AddCliente([FromBody] Cliente request)
        {
            await _context.Cliente.AddAsync(request);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpPut]
        [Route("EditCliente")]
        public async Task<IActionResult> EditCliente([FromBody] Cliente cliente)
        {
            _context.Cliente.Update(cliente);
            _context.SaveChanges();
            return Ok();
        }

    }

    public class newId
    {
        public int Id { get; set; }
    }
}
