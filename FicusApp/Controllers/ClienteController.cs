using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using FicusApp.Models;
using System.Linq;
using FicusApp.Services;
using Microsoft.AspNetCore.Authorization;

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

        //[Authorize]
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
        [Route("GetCliente/{ClienteId}")]
        public async Task<IActionResult> GetCliente(int ClienteId)
        {
            Cliente cliente = await _clientService.GetCliente(ClienteId);
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

        [HttpPut]
        [Route("DeleteCliente")]
        public async Task<IActionResult> DeleteCliente([FromBody] Cliente cliente)
        {
            int code = await _clientService.DeleteCliente(cliente);
            return Ok();
        }
    }

    public class newId
    {
        public int Id { get; set; }
    }
}
