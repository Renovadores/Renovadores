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

        

    OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
