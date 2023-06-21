using FicusApp.Models;
using Microsoft.AspNetCore.Mvc;

namespace FicusApp.Services
{
    public interface IClientSegmentService
    {
        List<ClienteSegmento> GetSegments(int id);
        Task<int> AddSegment([FromBody] ClienteSegmento request);
        Task<int> DeleteClientSegment([FromBody] ClienteSegmento request);
    }
}
