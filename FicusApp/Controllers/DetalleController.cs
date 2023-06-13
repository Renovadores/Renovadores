using FicusApp.Models;
using FicusApp.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FicusApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DetalleController : ControllerBase
    {
        private readonly DetailService _detailService;

        public DetalleController(DetailService detailService)
        {
            _detailService = detailService;
        }

        [HttpPost]
        [Route("AddDetalle")]
        public async Task<IActionResult> AddDetalle([FromBody] Detalle request)
        {
            int code = await _detailService.AddDetalle(request);
            return Ok();
        }

    }
}
