﻿using FicusApp.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FicusApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DetalleController : ControllerBase
    {
        private readonly FicusContext _context;

        public DetalleController(FicusContext context)
        {
            _context = context;
        }

        [HttpPost]
        [Route("AddDetalle")]
        public async Task<IActionResult> AddDetalle([FromBody] Detalle request)
        {
            await _context.Detalle.AddAsync(request);
            await _context.SaveChangesAsync();
            return Ok();
        }

    }
}