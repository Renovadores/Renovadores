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
            List<Cliente> clientes = _context.Cliente.OrderByDescending(c => c.Id).ToList();
            return Ok(clientes);
        }

        [HttpGet]
        [Route("GetCliente/{id}")]
        public async Task<IActionResult> GetCliente(int id)
        {
            Cliente cliente = await _context.Cliente.FindAsync(id);
            return Ok(cliente);
        }

        [HttpPost]
        [Route("AddCliente")]
        public async Task<IActionResult> AddCliente([FromBody] Cliente request)
        {
            //TO-DO create a Service with method GenerateId
            int generatedID = _context.Cliente.Count() + 1;
            request.Id = generatedID;
            await _context.Cliente.AddAsync(request);
            await _context.SaveChangesAsync();
            return Ok(generatedID);
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
}
