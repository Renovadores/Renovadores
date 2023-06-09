﻿using FicusApp.Models;
using Microsoft.AspNetCore.Mvc;

namespace FicusApp.Services
{
    public class EventService : IEventService
    {
        private readonly FicusContext _context;

        public EventService(FicusContext context)
        {
            _context = context;
        }

        public async Task<int> AddEvento([FromBody] Evento request)
        {
            request.EventoId = _context.Evento.Count() + 1;
            await _context.Evento.AddAsync(request);
            await _context.SaveChangesAsync();
            return 0;
        }

        public async void EditDescription([FromBody] Evento evento)
        {
            _context.Evento.Update(evento);
            _context.SaveChanges();
        }

        public bool FindEvento(string name)
        {
            bool exists = _context.Evento.Where(e => e.NombreEvento == name).FirstOrDefault() != null;
            return exists;
        }

        public int GetEventId(string name)
        {
            int r = _context.Evento.Where(e => e.NombreEvento == name).FirstOrDefault().EventoId;
            return r;
        }

        public List<Evento> GetEventos()
        {
            List<Evento> eventos = _context.Evento.OrderBy(c => c.NombreEvento).ToList();
            return eventos;
        }
    }
}
