﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using FicusApp.Models;

namespace FicusApp.Services
{
    public interface IClientService
    {
        Task<List<Cliente>> GetClientes();
        Task<int> GetNewId();
        Task<Cliente> GetCliente(int id);
        Task<int> AddCliente([FromBody] Cliente request);
        Task<int> EditCliente([FromBody] Cliente cliente);
    }
}
