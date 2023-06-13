using System;
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
        => optionsBuilder.UseSqlServer("Server=DESKTOP-7EIA8UC;Database=Ficus;Integrated Security=True; TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Categoria>(entity =>
        {
            entity.HasKey(e => e.CategoriaId).HasName("PK__Categori__F353C1E56FB7B3F6");

            entity.Property(e => e.CategoriaId).ValueGeneratedNever();
        });

        modelBuilder.Entity<Cliente>(entity =>
        {
            entity.HasKey(e => e.ClienteId).HasName("PK__Cliente__71ABD087909B335C");

            entity.Property(e => e.ClienteId).ValueGeneratedNever();

            entity.HasOne(d => d.Responsable).WithMany(p => p.Cliente).HasConstraintName("FK__Cliente__Respons__571DF1D5");
        });

        modelBuilder.Entity<ClienteComunicacion>(entity =>
        {
            entity.HasKey(e => e.ClienteComunicacionId).HasName("PK__ClienteC__BA07486E7A159379");

            entity.HasOne(d => d.Cliente).WithMany(p => p.ClienteComunicacion).HasConstraintName("FK__ClienteCo__Clien__59FA5E80");

            entity.HasOne(d => d.Medio).WithMany(p => p.ClienteComunicacion).HasConstraintName("FK__ClienteCo__Medio__5AEE82B9");
        });

        modelBuilder.Entity<ClienteSegmento>(entity =>
        {
            entity.HasKey(e => e.ClienteSegmentoId).HasName("PK__ClienteS__644B553111D2E9EF");

            entity.HasOne(d => d.Cliente).WithMany(p => p.ClienteSegmento)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__ClienteSe__Clien__5812160E");

            entity.HasOne(d => d.Segmento).WithMany(p => p.ClienteSegmento)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__ClienteSe__Segme__59063A47");
        });

        modelBuilder.Entity<Color>(entity =>
        {
            entity.HasKey(e => e.ColorId).HasName("PK__Color__8DA7674D677C263F");

            entity.Property(e => e.ColorId).ValueGeneratedNever();
        });

        modelBuilder.Entity<Detalle>(entity =>
        {
            entity.HasKey(e => new { e.OrdenId, e.ProductoId }).HasName("PK__Detalle__EACBAFEEFFA0F6CF");

            entity.HasOne(d => d.Orden).WithMany(p => p.Detalle)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Detalle__OrdenId__5535A963");

            entity.HasOne(d => d.Producto).WithMany(p => p.Detalle)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Detalle__Product__5629CD9C");
        });

        modelBuilder.Entity<Estado>(entity =>
        {
            entity.HasKey(e => e.EstadoId).HasName("PK__Estado__FEF86B000042F2F0");

            entity.Property(e => e.EstadoId).ValueGeneratedNever();
        });

        modelBuilder.Entity<Evento>(entity =>
        {
            entity.HasKey(e => e.EventoId).HasName("PK__Evento__1EEB59214DEA0DA0");

            entity.Property(e => e.EventoId).ValueGeneratedNever();
        });

        modelBuilder.Entity<Familia>(entity =>
        {
            entity.HasKey(e => e.FamiliaId).HasName("PK__Familia__42DFCCC4FA9719A6");

            entity.Property(e => e.FamiliaId).ValueGeneratedNever();
        });

        modelBuilder.Entity<Fase>(entity =>
        {
            entity.HasKey(e => e.FaseId).HasName("PK__Fase__D04348754F13BE92");

            entity.Property(e => e.FaseId).ValueGeneratedNever();
        });

        modelBuilder.Entity<HistorialOrden>(entity =>
        {
            entity.HasKey(e => new { e.OrdenId, e.FaseId }).HasName("PK__Historia__8D8C918324F06348");

            entity.HasOne(d => d.Fase).WithMany(p => p.HistorialOrden)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Historial__FaseI__5441852A");

            entity.HasOne(d => d.Orden).WithMany(p => p.HistorialOrden)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Historial__Orden__534D60F1");
        });

        modelBuilder.Entity<HistorialRefreshToken>(entity =>
        {
            entity.HasKey(e => e.IdHistorialToken).HasName("PK__Historia__03DC48A555DE18D7");

            entity.Property(e => e.EsActivo).HasComputedColumnSql("(case when [FechaExpiracion]<getdate() then CONVERT([bit],(0)) else CONVERT([bit],(1)) end)", false);

            entity.HasOne(d => d.Usuario).WithMany(p => p.HistorialRefreshToken).HasConstraintName("FK__Historial__Usuar__286302EC");
        });

        modelBuilder.Entity<Inventario>(entity =>
        {
            entity.HasOne(d => d.Producto).WithMany().HasConstraintName("FK__Inventari__Produ__4F7CD00D");
        });

        modelBuilder.Entity<MedioComunicacion>(entity =>
        {
            entity.HasKey(e => e.MedioId).HasName("PK__MedioCom__26B59BB6A847AEB2");
        });

        modelBuilder.Entity<Orden>(entity =>
        {
            entity.HasKey(e => e.OrdenId).HasName("PK__Orden__C088A5045D93431D");

            entity.Property(e => e.OrdenId).ValueGeneratedNever();

            entity.HasOne(d => d.Cliente).WithMany(p => p.Orden)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Orden__ClienteId__5165187F");

            entity.HasOne(d => d.Evento).WithMany(p => p.Orden).HasConstraintName("FK__Orden__EventoId__52593CB8");

            entity.HasOne(d => d.Usuario).WithMany(p => p.Orden)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Orden__UsuarioId__5070F446");
        });

        modelBuilder.Entity<Producto>(entity =>
        {
            entity.HasKey(e => e.ProductoId).HasName("PK__Producto__A430AEA32A15B4AE");

            entity.Property(e => e.Descontinuado).HasDefaultValueSql("((0))");
            entity.Property(e => e.Disponible).HasDefaultValueSql("((0))");
            entity.Property(e => e.EnUso).HasDefaultValueSql("((0))");
            entity.Property(e => e.NoDevueltos).HasDefaultValueSql("((0))");
            entity.Property(e => e.TotalExistente).HasDefaultValueSql("((0))");

            entity.HasOne(d => d.Categoria).WithMany(p => p.Producto).HasConstraintName("FK__Producto__Catego__4D94879B");

            entity.HasOne(d => d.Color).WithMany(p => p.Producto).HasConstraintName("FK__Producto__ColorI__4CA06362");

            entity.HasOne(d => d.Familia).WithMany(p => p.Producto).HasConstraintName("FK__Producto__Famili__4E88ABD4");
        });

        modelBuilder.Entity<Rol>(entity =>
        {
            entity.HasKey(e => e.RolId).HasName("PK__Rol__F92302F1A8B87EFD");

            entity.Property(e => e.RolId).ValueGeneratedNever();
        });

        modelBuilder.Entity<Segmento>(entity =>
        {
            entity.HasKey(e => e.SegmentoId).HasName("PK__Segmento__DC1DD0F37B84829B");
        });

        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.HasKey(e => e.UsuarioId).HasName("PK__Usuario__2B3DE7B889A05510");

            entity.Property(e => e.UsuarioId).ValueGeneratedNever();

            entity.HasOne(d => d.Rol).WithMany(p => p.Usuario).HasConstraintName("FK__Usuario__RolId__4BAC3F29");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
