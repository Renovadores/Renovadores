using FicusApp.Models;
using FicusApp.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.InteropServices.JavaScript;

namespace FicusApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdenController : ControllerBase
    {
        private readonly IOrderService _orderService;

        public OrdenController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        [Authorize]
        [HttpGet]
        [Route("GetOrders")]
        public async Task<IActionResult> GetOrders()
        {
            List<Orden> ordenes = await _orderService.GetOrders();
            return Ok(ordenes);
        }

        [Authorize]
        [HttpGet]
        [Route("GetOrdersByDate/{eventId}")]
        public async Task<IActionResult> GetOrdersByDate(int eventId)
        {
            List<List<Orden>> ordenes = await _orderService.GetOrdersByDate(eventId);
            return Ok(ordenes);
        }

        [Authorize]
        [HttpGet]
        [Route("GetNewCode")]
        public async Task<IActionResult> GetNewCode()
        {
            int code = await _orderService.GetNewCode();
            NewCode response = new()
            {
                Id = code
            };
            return Ok(response);
        }

        [Authorize]
        [HttpPost]
        [Route("AddOrder")]
        public async Task<IActionResult> AddOrder([FromBody] Orden request)
        {
            int code = await _orderService.AddOrder(request);
            return Ok();
        }
    }

    public class NewCode
    {
        public int Id { get; set; }
    }
}
