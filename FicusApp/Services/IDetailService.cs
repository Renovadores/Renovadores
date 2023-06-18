using FicusApp.Models;
using Microsoft.AspNetCore.Mvc;

namespace FicusApp.Services
{
    public interface IDetailService
    {
        Task<List<Detalle>> GetDetalle();
        Task<int> AddDetalle([FromBody] Detalle request);

    }
}
