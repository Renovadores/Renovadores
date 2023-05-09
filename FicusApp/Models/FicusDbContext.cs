using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace FicusApp.Models;

public partial class FicusDbContext : DbContext
{
    public FicusDbContext()
    {
    }

    public FicusDbContext(DbContextOptions<FicusDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Cliente> Cliente { get; set; }
    public virtual DbSet<Producto> Producto { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseSqlServer("Server=KEVIN\\BD_KEVIN; DataBase=Ficus; Integrated Security=True; TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Cliente>(entity =>
        {
            entity.Property(e => e.Id).HasColumnName("ID_Cliente");
            entity.Property(e => e.Tipo).HasMaxLength(255);
            entity.Property(e => e.Fecha_Agregado).HasColumnType("dateTime");
            entity.Property(e => e.Responsable).HasMaxLength(255);
            entity.Property(e => e.Prioridad).HasMaxLength(255);
            entity.Property(e => e.Estado).HasMaxLength(255);
            entity.Property(e => e.Nombre).HasMaxLength(255);
            entity.Property(e => e.Telefono).HasColumnType("int");
            entity.Property(e => e.Correo).HasMaxLength(255);
            entity.Property(e => e.Web).HasMaxLength(255);
});
        modelBuilder.Entity<Producto>(entity =>
        { 
            entity.Property(e => e.SKU).HasColumnName("SKU");
            entity.Property(e => e.Nombre).HasMaxLength(50);
            entity.Property(e => e.Descripcion).HasMaxLength(50);
            entity.Property(e => e.Dimensiones).HasMaxLength(50);
            entity.Property(e => e.Peso_recipiente).HasColumnName("Peso_recipiente");
            entity.Property(e => e.Peso_desechable).HasColumnName("Peso_desechable");
            entity.Property(e => e.SKU).HasColumnName("Alquiler_Comercios");
            entity.Property(e => e.SKU).HasColumnName("Alquiler_Retail");
        });

        

    OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
