using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using FicusApp.Models;

namespace FicusApp.Services
{
    public interface IClientService
    {
        Task<(int, List<Cliente>)> GetClientes();
        Task<List<Cliente>> GetMatchClients(string input);
        Task<int> GetNewId();
        Task<(int, Cliente?)> GetCliente(int id);
        Task<int> AddCliente([FromBody] Cliente request);
        Task<int> EditCliente([FromBody] Cliente cliente);
        Task<int> DeleteCliente([FromBody] Cliente cliente);
    }
}
