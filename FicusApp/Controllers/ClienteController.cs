﻿using Microsoft.AspNetCore.Http;
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
        private readonly IClientService _clientService;
        private const int SUCCESS_CODE = 0;
        private const int OUT_OF_RANGE_CODE = 1;
        private const int NOT_FOUND_CODE = -1;

        public ClienteController(IClientService clientService)
        {
            _clientService = clientService;
        }

        [Authorize]
        [HttpGet]
        [Route("GetClientes")]
        public async Task<IActionResult> GetClientes()
        {
            (int code, List<Cliente> clientes) = await _clientService.GetClientes();
            if (code == NOT_FOUND_CODE)
            {
                // There are no clients in the DB
                return Ok(clientes);
            }
            else if (code == OUT_OF_RANGE_CODE)
            {
                return BadRequest();
            }
            {
                return Ok(clientes);
            }
            
        }

        [Authorize]
        [HttpGet]
        [Route("GetAllClientes")]
        public async Task<IActionResult> GetAllClientes()
        {
            List<Cliente> clientes = await _clientService.GetAllClientes();
            return Ok(clientes);
        }

        [Authorize]
        [HttpGet]
        [Route("GetTotalClients")]
        public async Task<IActionResult> GetTotalClients()
        {
            int totalClients = await _clientService.GetTotalClients();
            return Ok(totalClients);
        }

        [Authorize]
        [HttpGet]
        [Route("GetMatchClients/{nombre}")]
        public async Task<IActionResult> GetMatchClients(string nombre)
        {
            List<Cliente> clientes = await _clientService.GetMatchClients(nombre);
            return Ok(clientes);
        }

        [Authorize]
        [HttpGet]
        [Route("GetNewId")]
        public async Task<IActionResult> GetNewId()
        {
            NewId id = new()
            {
                Id = await _clientService.GetNewId()
            };
            return Ok(id);
        }

        [Authorize]
        [HttpGet]
        [Route("GetCliente/{ClienteId}")]
        public async Task<IActionResult> GetCliente(int ClienteId)
        {
            (int code, Cliente? client) = await _clientService.GetCliente(ClienteId);
            if (code == NOT_FOUND_CODE)
            {
                // There are no clients in the DB
                return NotFound();
            }
            else if (code == OUT_OF_RANGE_CODE)
            {
                // The id doesn't exist
                return BadRequest();
            }
            else
            {
                return Ok(client);
            }
        }

        [Authorize]
        [HttpPost]
        [Route("AddCliente")]
        public async Task<IActionResult> AddCliente([FromBody] Cliente request)
        {
            await _clientService.AddCliente(request);
            return Ok();
        }

        [Authorize]
        [HttpPut]
        [Route("EditCliente")]
        public async Task<IActionResult> EditCliente([FromBody] Cliente cliente)
        {
            await _clientService.EditCliente(cliente);
            return Ok();
        }

        [Authorize]
        [HttpPut]
        [Route("DeleteCliente")]
        public async Task<IActionResult> DeleteCliente([FromBody] Cliente cliente)
        {
            await _clientService.DeleteCliente(cliente);
            return Ok();
        }
    }

    public class NewId
    {
        public int Id { get; set; }
    }
}
