using FicusApp.Models;
using Microsoft.EntityFrameworkCore;
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

        [HttpGet]
        [Route("GetTodayOrders")]
        public async Task<IActionResult> GetTodayOrders()
        {
            List<Orden> ordenes = await _orderService.GetTodayOrder();
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


        // PUT: api/Orden/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [Authorize]
        [HttpPut("PutOrden{id}")]
        public async Task<IActionResult> PutOrden(int id, Orden orden)
        {
            if (id != orden.OrdenId)
            {
                return BadRequest();
            }

            try
            {
                await _orderService.UpdateOrden(orden);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_orderService.OrdenExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }
        
        [Authorize]
        [HttpDelete("DeleteOrden/{id}")]
        public async Task<IActionResult> DeleteOrden(int id)
        {
            var result = await _orderService.DeleteOrden(id);
            
            if (result)
            {
                return NoContent();
            }
            else
            {
                return NotFound();
            }
        }

    }

    public class NewCode
    {
        public int Id { get; set; }
    }
}
