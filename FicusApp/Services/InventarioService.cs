﻿using FicusApp.Controllers;
using FicusApp.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FicusApp.Services;

    public class InventarioService : IInventarioService
    {
    private readonly FicusContext _context;

    public InventarioService(FicusContext context)
    {
        _context = context;
    }
    [HttpGet]
    [Route("GetInventory")]
    public async Task<List<Inventario>> GetInventory()
    {
        //List<Inventario> Inventarios = _context.Inventario.OrderByDescending(c => c.Producto).ToList();
        var Inventarios = _context.Inventario
            .Include(inventario => inventario.Producto)
            .OrderByDescending(c => c.ProductoId)
            .ToList();

        return Inventarios;
    }
    [HttpGet]
    [Route("GetNewId")]
    public async Task<newId> GetNewId()
    {
        newId id = new newId();
        id.Id = _context.Inventario.Count() + 1;
        return id;
    }

    [HttpGet]
    [Route("GetState")]
    public async Task<List<Estado>> GetState()
    {
        var Estados = _context.Estado
            .ToList();

        return Estados;
    }

    [HttpGet]
    [Route("GetInventory/{ProductoId}")]
    public async Task<Inventario> GetInventoryDetail(string ProductoId)
    {
        Inventario inventario = await _context.Inventario.FindAsync(ProductoId);

        return inventario;
    }

    [HttpGet]
    [Route("GetInventoryRow/{InventarioId}")]
    public async Task<Inventario?> GetInventoryRow(int InventarioId)
    {
        var inventario = await _context.Inventario.FindAsync(InventarioId);

        return inventario;
    }

    [HttpPost]
    [Route("AddInventory")]
    public async Task<Inventario> AddInventory([FromBody] Inventario request)
    {
        var task = await _context.Inventario.AddAsync(request);
        
        await _context.SaveChangesAsync();

        var inventory = task.Entity;

        _context
            .Entry(inventory)
            .Reference(i => i.Producto)
            .Load();

        return inventory;
    }

    [HttpPut]
    [Route("EditInventory")]
    public async Task<Inventario> EditInventory([FromBody] Inventario inventario)
    {
        _context.Inventario.Update(inventario);
        _context.SaveChanges();
        return inventario;
    }
}


