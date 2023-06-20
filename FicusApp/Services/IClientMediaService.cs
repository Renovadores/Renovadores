using FicusApp.Models;
using Microsoft.AspNetCore.Mvc;

namespace FicusApp.Services
{
    public interface IClientMediaService
    {
        List<ClienteComunicacion> GetMedia(int id);
        Task<int> AddMedia([FromBody] ClienteComunicacion request);
        Task<int> DeleteClientMedia([FromBody] ClienteComunicacion request);
    }
}
