using FicusApp.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FicusApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReporteController : ControllerBase
    {
        private readonly IReportService _reportService;

        public ReporteController(IReportService reportService)
        {
            _reportService = reportService;
        }

        [HttpGet]
        [Route("GetAnnualEnvironmentalReport/{year}")]
        public async Task<IActionResult> GetAnnualEnvironmentalReport(int year)
        {
            List<int> annualReport = await _reportService.GetAnnualEnvironmentReport(year);
            return Ok(annualReport);
        }

    }
}
