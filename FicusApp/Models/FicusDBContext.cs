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
    public virtual DbSet<Producto> Producto { get; set; }
    public virtual DbSet<Cliente> Cliente { get; set; }
    

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=KEVIN\\BD_KEVIN; DataBase=Ficus; Integrated Security=True; TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Cliente>(entity =>
        {
            entity.Property(e => e.Id).HasColumnName("ID_Cliente");
            entity.Property(e => e.Fecha_Agregado).HasColumnType("dateTime");
            entity.Property(e => e.Responsable).HasColumnType("int");
            entity.Property(e => e.Prioridad).HasMaxLength(255);
            entity.Property(e => e.Estado).HasMaxLength(255);
            entity.Property(e => e.Nombre_Empresa).HasMaxLength(255);
            entity.Property(e => e.Contacto).HasMaxLength(255);
            entity.Property(e => e.Telefono).HasColumnType("int");
            entity.Property(e => e.Correo).HasMaxLength(255);
            entity.Property(e => e.Web).HasMaxLength(255);
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
            entity.Property(e => e.Imagen).HasMaxLength(255);

        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}