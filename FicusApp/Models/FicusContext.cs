﻿using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace FicusApp.Models;

public partial class FicusContext : DbContext
{
    public FicusContext()
    {
    }

    public FicusContext(DbContextOptions<FicusContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Categoria> Categoria { get; set; }

    public virtual DbSet<Cliente> Cliente { get; set; }

    public virtual DbSet<ClienteComunicacion> ClienteComunicacion { get; set; }

    public virtual DbSet<ClienteSegmento> ClienteSegmento { get; set; }

    public virtual DbSet<Color> Color { get; set; }

    public virtual DbSet<Detalle> Detalle { get; set; }

    public virtual DbSet<Estado> Estado { get; set; }

    public virtual DbSet<Evento> Evento { get; set; }

    public virtual DbSet<Familia> Familia { get; set; }

    public virtual DbSet<Fase> Fase { get; set; }

    public virtual DbSet<HistorialOrden> HistorialOrden { get; set; }

    public virtual DbSet<HistorialRefreshToken> HistorialRefreshToken { get; set; }

    public virtual DbSet<Inventario> Inventario { get; set; }

    public virtual DbSet<MedioComunicacion> MedioComunicacion { get; set; }

    public virtual DbSet<Orden> Orden { get; set; }

    public virtual DbSet<Producto> Producto { get; set; }

    public virtual DbSet<Rol> Rol { get; set; }

    public virtual DbSet<Segmento> Segmento { get; set; }

    public virtual DbSet<Usuario> Usuario { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=KEVIN\\BD_KEVIN;Database=Ficus;Integrated Security=True; TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Categoria>(entity =>
        {
            entity.HasKey(e => e.CategoriaId).HasName("PK__Categori__F353C1E5A09BD8AA");

            entity.Property(e => e.CategoriaId).ValueGeneratedNever();
        });

        modelBuilder.Entity<Cliente>(entity =>
        {
            entity.HasKey(e => e.ClienteId).HasName("PK__Cliente__71ABD087E1E2228C");

            entity.Property(e => e.ClienteId).ValueGeneratedNever();

            entity.HasOne(d => d.Responsable).WithMany(p => p.Cliente).HasConstraintName("FK__Cliente__Respons__6A30C649");
        });

        modelBuilder.Entity<ClienteComunicacion>(entity =>
        {
            entity.HasKey(e => e.ClienteComunicacionId).HasName("PK__ClienteC__BA07486EE7D11BFE");

            entity.HasOne(d => d.Cliente).WithMany(p => p.ClienteComunicacion).HasConstraintName("FK__ClienteCo__Clien__6D0D32F4");

            entity.HasOne(d => d.Medio).WithMany(p => p.ClienteComunicacion).HasConstraintName("FK__ClienteCo__Medio__6E01572D");
        });

        modelBuilder.Entity<ClienteSegmento>(entity =>
        {
            entity.HasKey(e => e.ClienteSegmentoId).HasName("PK__ClienteS__644B55310149B66A");

            entity.HasOne(d => d.Cliente).WithMany(p => p.ClienteSegmento)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__ClienteSe__Clien__6B24EA82");

            entity.HasOne(d => d.Segmento).WithMany(p => p.ClienteSegmento)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__ClienteSe__Segme__6C190EBB");
        });

        modelBuilder.Entity<Color>(entity =>
        {
            entity.HasKey(e => e.ColorId).HasName("PK__Color__8DA7674DB12C382B");

            entity.Property(e => e.ColorId).ValueGeneratedNever();
        });

        modelBuilder.Entity<Detalle>(entity =>
        {
            entity.HasKey(e => new { e.OrdenId, e.ProductoId }).HasName("PK__Detalle__EACBAFEE759D6BF2");

            entity.HasOne(d => d.Orden).WithMany(p => p.Detalle)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Detalle__OrdenId__68487DD7");

            entity.HasOne(d => d.Producto).WithMany(p => p.Detalle)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Detalle__Product__693CA210");
        });

        modelBuilder.Entity<Estado>(entity =>
        {
            entity.HasKey(e => e.EstadoId).HasName("PK__Estado__FEF86B00E91DC354");

            entity.Property(e => e.EstadoId).ValueGeneratedNever();
        });

        modelBuilder.Entity<Evento>(entity =>
        {
            entity.HasKey(e => e.EventoId).HasName("PK__Evento__1EEB592184A5AD0D");

            entity.Property(e => e.EventoId).ValueGeneratedNever();
        });

        modelBuilder.Entity<Familia>(entity =>
        {
            entity.HasKey(e => e.FamiliaId).HasName("PK__Familia__42DFCCC4EAD465D1");

            entity.Property(e => e.FamiliaId).ValueGeneratedNever();
        });

        modelBuilder.Entity<Fase>(entity =>
        {
            entity.HasKey(e => e.FaseId).HasName("PK__Fase__D04348750FA195BC");

            entity.Property(e => e.FaseId).ValueGeneratedNever();
        });

        modelBuilder.Entity<HistorialOrden>(entity =>
        {
            entity.HasKey(e => new { e.OrdenId, e.FaseId }).HasName("PK__Historia__8D8C918354878AC0");

            entity.HasOne(d => d.Fase).WithMany(p => p.HistorialOrden)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Historial__FaseI__6754599E");

            entity.HasOne(d => d.Orden).WithMany(p => p.HistorialOrden)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Historial__Orden__66603565");
        });

        modelBuilder.Entity<HistorialRefreshToken>(entity =>
        {
            entity.HasKey(e => e.IdHistorialToken).HasName("PK__Historia__03DC48A56F25AA9B");

            entity.Property(e => e.EsActivo).HasComputedColumnSql("(case when [FechaExpiracion]<getdate() then CONVERT([bit],(0)) else CONVERT([bit],(1)) end)", false);

            entity.HasOne(d => d.Usuario).WithMany(p => p.HistorialRefreshToken).HasConstraintName("FK__Historial__Usuar__3B75D760");
        });

        modelBuilder.Entity<Inventario>(entity =>
        {
            entity.HasOne(d => d.Producto).WithMany().HasConstraintName("FK__Inventari__Produ__628FA481");
        });

        modelBuilder.Entity<MedioComunicacion>(entity =>
        {
            entity.HasKey(e => e.MedioId).HasName("PK__MedioCom__26B59BB6E7590C2F");
        });

        modelBuilder.Entity<Orden>(entity =>
        {
            entity.HasKey(e => e.OrdenId).HasName("PK__Orden__C088A504DC71456C");

            entity.Property(e => e.OrdenId).ValueGeneratedNever();

            entity.HasOne(d => d.Cliente).WithMany(p => p.Orden)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Orden__ClienteId__6477ECF3");

            entity.HasOne(d => d.Evento).WithMany(p => p.Orden).HasConstraintName("FK__Orden__EventoId__656C112C");

            entity.HasOne(d => d.Usuario).WithMany(p => p.Orden)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Orden__UsuarioId__6383C8BA");
        });

        modelBuilder.Entity<Producto>(entity =>
        {
            entity.HasKey(e => e.ProductoId).HasName("PK__Producto__A430AEA32A897CD5");

            entity.Property(e => e.Descontinuado).HasDefaultValueSql("((0))");
            entity.Property(e => e.Disponible).HasDefaultValueSql("((0))");
            entity.Property(e => e.EnUso).HasDefaultValueSql("((0))");
            entity.Property(e => e.NoDevueltos).HasDefaultValueSql("((0))");
            entity.Property(e => e.TotalExistente).HasDefaultValueSql("((0))");

            entity.HasOne(d => d.Categoria).WithMany(p => p.Producto).HasConstraintName("FK__Producto__Catego__60A75C0F");

            entity.HasOne(d => d.Color).WithMany(p => p.Producto).HasConstraintName("FK__Producto__ColorI__5FB337D6");

            entity.HasOne(d => d.Familia).WithMany(p => p.Producto).HasConstraintName("FK__Producto__Famili__619B8048");
        });

        modelBuilder.Entity<Rol>(entity =>
        {
            entity.HasKey(e => e.RolId).HasName("PK__Rol__F92302F146A8FABB");

            entity.Property(e => e.RolId).ValueGeneratedNever();
        });

        modelBuilder.Entity<Segmento>(entity =>
        {
            entity.HasKey(e => e.SegmentoId).HasName("PK__Segmento__DC1DD0F346807E68");
        });

        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.HasKey(e => e.UsuarioId).HasName("PK__Usuario__2B3DE7B8EF938404");

            entity.Property(e => e.UsuarioId).ValueGeneratedNever();

            entity.HasOne(d => d.Rol).WithMany(p => p.Usuario).HasConstraintName("FK__Usuario__RolId__5EBF139D");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
