using FicusApp.Models;
using FicusApp.Services;
using Microsoft.AspNetCore.Mvc;

namespace FicusApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdenController : ControllerBase
    {
        private readonly OrderService _orderService;

        public OrdenController(OrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpGet]
        [Route("GetOrders")]
        public async Task<IActionResult> GetOrders()
        {
            List<Orden> ordenes = await _orderService.GetOrders();
            return Ok(ordenes);
        }

        [HttpGet]
        [Route("GetNewCode")]
        public async Task<IActionResult> GetNewCode()
        {
            int orderCode = await _orderService.GetNewCode();
            NewCode response = new()
            {
                Id = orderCode
            };
            return Ok(response);
        }

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
