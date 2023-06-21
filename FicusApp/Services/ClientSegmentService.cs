using FicusApp.Models;
using Microsoft.AspNetCore.Mvc;

namespace FicusApp.Services
{
    public class ClientSegmentService : IClientSegmentService
    {
        private readonly FicusContext _context;

        public ClientSegmentService(FicusContext context)
        {
            _context = context;
        }

        public async Task<int> AddSegment([FromBody] ClienteSegmento request)
        {
            await _context.ClienteSegmento.AddAsync(request);
            await _context.SaveChangesAsync();
            return 0;
        }

        public async Task<int> DeleteClientSegment([FromBody] ClienteSegmento request)
        {
            ClienteSegmento clienteSegmento = _context.ClienteSegmento.Where(s =>
                                                s.ClienteId == request.ClienteId
                                                && s.SegmentoId == request.SegmentoId).FirstOrDefault();
            _context.ClienteSegmento.Remove(clienteSegmento);
            _context.SaveChanges();
            return 0;
        }

        public List<ClienteSegmento> GetSegments(int id)
        {
            List<ClienteSegmento> clienteSegmentos = _context.ClienteSegmento
                                                       .Where(s => s.ClienteId == id).ToList();
            return clienteSegmentos;
        }
    }
}
