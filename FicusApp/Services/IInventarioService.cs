using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using FicusApp.Models;
using FicusApp.Controllers;

namespace FicusApp.Services;

    public interface IInventarioService
    {
        Task<List<Inventario>> GetInventory();
        Task<newId> GetNewId();
        Task<List<Estado>> GetState();
        Task<Inventario> GetInventoryDetail(string SKU);
        Task<Inventario> GetInventoryRow(int ID_Inventario);
        Task<Inventario> AddInventory([FromBody] Inventario request);
        Task<Inventario> EditInventory([FromBody] Inventario inventario);
    }

