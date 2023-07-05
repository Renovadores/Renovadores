using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FicusApp.Models;
using FicusApp.Services;
using Microsoft.AspNetCore.Authorization;

namespace FicusApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DetalleController : ControllerBase
    {
        private readonly IDetailService _detailService;

        public DetalleController(IDetailService detailService)
        {
            _detailService = detailService;
        }

        // GET: api/Detalle
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Detalle>>> GetDetalle()
        {
            List<Detalle> details = await _detailService.GetDetalle();
            if (details == null)
            {
                return NotFound();
            }
            return details;
        }

        [Authorize]
        [HttpPost]
        [Route("AddDetalle")]
        public async Task<IActionResult> AddDetalle([FromBody] Detalle request)
        {
            int code = await _detailService.AddDetalle(request);
            return Ok();
        }

    }
}
