using System;
using System.Collections.Generic;
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

    public virtual DbSet<Cliente> Clientes { get; set; }
    public virtual DbSet<Producto> Producto { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=KEVIN\\BD_KEVIN; DataBase=FicusDB; Integrated Security=True; TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Cliente>(entity =>
        {
            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.Agregado).HasColumnType("date");
            entity.Property(e => e.Empresa).HasMaxLength(50);
            entity.Property(e => e.Prioridad).HasMaxLength(50);
            entity.Property(e => e.Responsable).HasMaxLength(50);
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
