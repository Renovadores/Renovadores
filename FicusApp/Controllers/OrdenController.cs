using FicusApp.Models;
using Microsoft.EntityFrameworkCore;
using FicusApp.Services;
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
            int code = await _orderService.GetNewCode();
            NewCode response = new()
            {
                Id = code
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


        // PUT: api/Orden/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
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
    }

    public class NewCode
    {
        public int Id { get; set; }
    }
}
