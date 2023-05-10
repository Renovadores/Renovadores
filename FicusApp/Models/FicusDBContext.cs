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
    public virtual DbSet<Producto> Productos { get; set; }
    public virtual DbSet<Cliente> Clientes { get; set; }
    

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=DESKTOP-7EIA8UC; DataBase=FicusDB; Integrated Security=True; TrustServerCertificate=True;");

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
            entity.Property(e => e.Nombre).HasMaxLength(255);
            entity.Property(e => e.Descripcion).HasMaxLength(255);
            entity.Property(e => e.Color).HasMaxLength(255);
            entity.Property(e => e.Dimensiones).HasMaxLength(255);
            entity.Property(e => e.Peso_recipiente).HasMaxLength(50);
            entity.Property(e => e.Peso_desechable).HasMaxLength(50);
            entity.Property(e => e.Alquiler_Comercios).HasMaxLength(50);
            entity.Property(e => e.Alquiler_Retail).HasMaxLength(50);
            entity.Property(e => e.Categoria).HasMaxLength(50);
            entity.Property(e => e.Familia).HasMaxLength(50);
            entity.Property(e => e.Imagen).HasMaxLength(50);

        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}