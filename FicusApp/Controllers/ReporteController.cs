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
            List<int> annualReport = await _reportService.GetAnnualEnvironmentalReport(year);
            return Ok(annualReport);
        }

        [HttpGet]
        [Route("GetClientAnnualEnvironmentalReport/{clientId}/{year}")]
        public async Task<IActionResult> GetClientAnnualEnvironmentalReport(int clientId, int year)
        {
            List<int> annualReport = await _reportService.GetClientAnnualEnvironmentalReport(clientId, year);
            return Ok(annualReport);
        }

        [HttpGet]
        [Route("GetAnnualOrderReport/{year}")]
        public async Task<IActionResult> GetAnnualOrderReport(int year)
        {
            List<int> annualReport = await _reportService.GetAnnualOrderReport(year);
            return Ok(annualReport);
        }

        [HttpGet]
        [Route("GetClientAnnualOrderReport/{clientId}/{year}")]
        public async Task<IActionResult> GetClientAnnualOrderReport(int clientId, int year)
        {
            List<int> annualReport = await _reportService.GetClientAnnualOrderReport(clientId, year);
            return Ok(annualReport);
        }
    }
}
