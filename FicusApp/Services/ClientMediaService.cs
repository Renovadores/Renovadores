using FicusApp.Models;
using Microsoft.AspNetCore.Mvc;

namespace FicusApp.Services
{
    public class ClientMediaService : IClientMediaService
    {
        private readonly FicusContext _context;

        public ClientMediaService(FicusContext context)
        {
            _context = context;
        }

        public List<ClienteComunicacion> GetMedia(int id)
        {
            List<ClienteComunicacion> clienteMedios = _context.ClienteComunicacion
                                                       .Where(s => s.ClienteId == id).ToList();
            return clienteMedios;
        }
        public async Task<int> AddMedia([FromBody] ClienteComunicacion request)
        {
            await _context.ClienteComunicacion.AddAsync(request);
            await _context.SaveChangesAsync();
            return 0;
        }
        public Task<int> DeleteClientMedia([FromBody] ClienteComunicacion request)
        {
            ClienteComunicacion clienteMedio = _context.ClienteComunicacion.Where(s =>
                                                s.ClienteId == request.ClienteId
                                                && s.MedioId == request.MedioId).FirstOrDefault();
            _context.ClienteComunicacion.Remove(clienteMedio);
            _context.SaveChanges();
            return Task.FromResult(0);
        }
    }
}
