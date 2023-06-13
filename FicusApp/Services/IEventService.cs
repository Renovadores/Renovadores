using FicusApp.Models;
using Microsoft.AspNetCore.Mvc;

namespace FicusApp.Services
{
    public interface IEventService
    {
        Task<List<Evento>> GetEventos();
        Task<int> AddEvento([FromBody] Evento request);
        Task<bool> FindEvento(string name);
        Task<int> GetEventId(string name);
    }
}
