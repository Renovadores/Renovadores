using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using FicusApp.Models;
using System.Linq;
using FicusApp.Services;

namespace FicusApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClienteController : ControllerBase
    {
        private readonly ClientService _clientService;

        public ClienteController(ClientService clientService)
        {
            _clientService = clientService;
        }

        [HttpGet]
        [Route("GetClientes")]
        public async Task<IActionResult> GetClientes()
        {
            List<Cliente> clientes = await _clientService.GetClientes();
            return Ok(clientes);
        }

        [HttpGet]
        [Route("GetNewId")]
        public async Task<IActionResult> GetNewId()
        {
            newId id = new()
            {
                Id = await _clientService.GetNewId()
            };
            return Ok(id);
        }

        [HttpGet]
        [Route("GetCliente/{id}")]
        public async Task<IActionResult> GetCliente(int id)
        {
            Cliente cliente = await _clientService.GetCliente(id);
            return Ok(cliente);
        }

        [HttpPost]
        [Route("AddCliente")]
        public async Task<IActionResult> AddCliente([FromBody] Cliente request)
        {
            int code = await _clientService.AddCliente(request);
            return Ok();
        }

        [HttpPut]
        [Route("EditCliente")]
        public async Task<IActionResult> EditCliente([FromBody] Cliente cliente)
        {
            int  code = await _clientService.EditCliente(cliente);
            return Ok();
        }

    }

    public class newId
    {
        public int Id { get; set; }
    }
}
