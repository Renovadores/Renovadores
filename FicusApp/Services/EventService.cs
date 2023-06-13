using FicusApp.Controllers;
using FicusApp.Models;
using Microsoft.AspNetCore.Mvc;

namespace FicusApp.Services
{
    public class EventService:IEventService
    {
        private readonly FicusContext _context;

        public EventService(FicusContext context)
        {
            _context = context;
        }

        public async Task<List<Evento>> GetEventos()
        {
            List<Evento> eventos = _context.Evento.OrderByDescending(c => c.EventoId).ToList();
            return eventos;
        }

        public async Task<int> AddEvento([FromBody] Evento request)
        {
            request.EventoId = _context.Evento.Count() + 1;
            await _context.Evento.AddAsync(request);
            await _context.SaveChangesAsync();
            return 1;
        }

        public async Task<bool> FindEvento(string name)
        {
            bool exists = _context.Evento.Where(e => e.NombreEvento == name).FirstOrDefault() != null;
            return exists;
        }

        public async Task<int> GetEventId(string name)
        {
            int eventId = _context.Evento.Where(e => e.NombreEvento == name).FirstOrDefault().EventoId;
            return eventId;
        }



    }
}
