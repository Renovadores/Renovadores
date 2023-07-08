using FicusApp.Models;
using Microsoft.AspNetCore.Mvc;

namespace FicusApp.Services
{
    public interface IDetailService
    {
        Task<List<Detalle>> GetDetalle();
        Task<int> AddDetalle([FromBody] Detalle request);
        Task<bool> UpdateDetalleExists(int OrdenId, string ProductoId);
        Task UpdateDetalle(Detalle detalle);
        bool DetalleExists(int OrdenId, string ProductoId);

    }
}
