using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using FicusApp.Models;
using FicusApp.Controllers;

namespace FicusApp.Services;

    public interface IInventarioService
    {
        Task<List<Inventario>> GetInventory();
        Task<NewId> GetNewId();
        //Task<List<Estado>> GetState();
        Task<Inventario> GetInventoryDetail(string ProductoId);
        Task<Inventario?> GetInventoryRow(int InventarioId);
        Task<Inventario> AddInventory([FromBody] Inventario request);
        Task<Inventario> EditInventory([FromBody] Inventario inventario);
        Task<List<Inventario>> GetMatchInventory(string input);
}

