using FicusApp.Models;
using Microsoft.AspNetCore.Mvc;

namespace FicusApp.Services
{
    public interface IEventService
    {
        List<Evento> GetEventos();
        Task<int> AddEvento([FromBody] Evento request);
        bool FindEvento(string name);
        int GetEventId(string name);

    }
}
