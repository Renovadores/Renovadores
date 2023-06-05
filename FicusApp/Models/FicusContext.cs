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

    public virtual DbSet<Color> Color { get; set; }

    public virtual DbSet<Detalle> Detalle { get; set; }

    public virtual DbSet<Estado> Estado { get; set; }

    public virtual DbSet<Evento> Evento { get; set; }

    public virtual DbSet<Familia> Familia { get; set; }

    public virtual DbSet<Fase> Fase { get; set; }

    public virtual DbSet<HistorialOrden> HistorialOrden { get; set; }

    public virtual DbSet<Inventario> Inventario { get; set; }

    public virtual DbSet<MedioComunicacion> MedioComunicacion { get; set; }

    public virtual DbSet<Orden> Orden { get; set; }

    public virtual DbSet<Producto> Producto { get; set; }

    public virtual DbSet<Rol> Rol { get; set; }

    public virtual DbSet<Segmento> Segmento { get; set; }

    public virtual DbSet<Usuario> Usuario { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
# warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=172.17.0.2;User id=sa;password=Hola1234;Database=Ficus;MultipleActiveResultSets=true;TrustServerCertificate=True");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Categoria>(entity =>
        {
            entity.HasKey(e => e.CategoriaId).HasName("PK__Categori__F353C1E57F57DE86");

            entity.Property(e => e.CategoriaId).ValueGeneratedNever();
        });

        modelBuilder.Entity<Cliente>(entity =>
        {
            entity.HasKey(e => e.ClienteId).HasName("PK__Cliente__71ABD087D720A99A");

            entity.Property(e => e.ClienteId).ValueGeneratedNever();

            entity.HasOne(d => d.Responsable).WithMany(p => p.Cliente).HasConstraintName("FK__Cliente__Respons__5165187F");

            entity.HasMany(d => d.Medio).WithMany(p => p.Cliente)
                .UsingEntity<Dictionary<string, object>>(
                    "ClienteComunicacion",
                    r => r.HasOne<MedioComunicacion>().WithMany()
                        .HasForeignKey("MedioId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__ClienteCo__Medio__5535A963"),
                    l => l.HasOne<Cliente>().WithMany()
                        .HasForeignKey("ClienteId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__ClienteCo__Clien__5441852A"),
                    j =>
                    {
                        j.HasKey("ClienteId", "MedioId").HasName("PK__ClienteC__03C0893C86D00196");
                        j.IndexerProperty<string>("MedioId").HasMaxLength(255);
                    });

            entity.HasMany(d => d.Segmento).WithMany(p => p.Cliente)
                .UsingEntity<Dictionary<string, object>>(
                    "ClienteSegmento",
                    r => r.HasOne<Segmento>().WithMany()
                        .HasForeignKey("SegmentoId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__ClienteSe__Segme__534D60F1"),
                    l => l.HasOne<Cliente>().WithMany()
                        .HasForeignKey("ClienteId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__ClienteSe__Clien__52593CB8"),
                    j =>
                    {
                        j.HasKey("ClienteId", "SegmentoId").HasName("PK__ClienteS__5C6A0D889C10026F");
                        j.IndexerProperty<string>("SegmentoId").HasMaxLength(255);
                    });
        });

        modelBuilder.Entity<Color>(entity =>
        {
            entity.HasKey(e => e.ColorId).HasName("PK__Color__8DA7674DA9E3AB3B");

            entity.Property(e => e.ColorId).ValueGeneratedNever();
        });

        modelBuilder.Entity<Detalle>(entity =>
        {
            entity.HasKey(e => new { e.OrdenId, e.ProductoId }).HasName("PK__Detalle__EACBAFEEEC7DAA64");

            entity.HasOne(d => d.Orden).WithMany(p => p.Detalle)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Detalle__OrdenId__4F7CD00D");

            entity.HasOne(d => d.Producto).WithMany(p => p.Detalle)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Detalle__Product__5070F446");
        });

        modelBuilder.Entity<Estado>(entity =>
        {
            entity.HasKey(e => e.EstadoId).HasName("PK__Estado__FEF86B00A630E2A3");

            entity.Property(e => e.EstadoId).ValueGeneratedNever();
        });

        modelBuilder.Entity<Evento>(entity =>
        {
            entity.HasKey(e => e.EventoId).HasName("PK__Evento__1EEB59217F3BB86C");

            entity.Property(e => e.EventoId).ValueGeneratedNever();
        });

        modelBuilder.Entity<Familia>(entity =>
        {
            entity.HasKey(e => e.FamiliaId).HasName("PK__Familia__42DFCCC467D36768");

            entity.Property(e => e.FamiliaId).ValueGeneratedNever();
        });

        modelBuilder.Entity<Fase>(entity =>
        {
            entity.HasKey(e => e.FaseId).HasName("PK__Fase__D04348755BEAB7B8");

            entity.Property(e => e.FaseId).ValueGeneratedNever();
        });

        modelBuilder.Entity<HistorialOrden>(entity =>
        {
            entity.HasKey(e => new { e.OrdenId, e.FaseId }).HasName("PK__Historia__8D8C91836DD6076E");

            entity.HasOne(d => d.Fase).WithMany(p => p.HistorialOrden)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Historial__FaseI__4E88ABD4");

            entity.HasOne(d => d.Orden).WithMany(p => p.HistorialOrden)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Historial__Orden__4D94879B");
        });

        modelBuilder.Entity<Inventario>(entity =>
        {
            entity.HasKey(e => new { e.ProductoId, e.EstadoId }).HasName("PK__Inventar__BBDF281360B227EE");

            entity.HasOne(d => d.Estado).WithMany(p => p.Inventario)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Inventari__Estad__49C3F6B7");

            entity.HasOne(d => d.Producto).WithMany(p => p.Inventario)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Inventari__Produ__48CFD27E");
        });

        modelBuilder.Entity<MedioComunicacion>(entity =>
        {
            entity.HasKey(e => e.MedioId).HasName("PK__MedioCom__26B59BB6FDD8C64F");
        });

        modelBuilder.Entity<Orden>(entity =>
        {
            entity.HasKey(e => e.OrdenId).HasName("PK__Orden__C088A5048C25D172");

            entity.Property(e => e.OrdenId).ValueGeneratedNever();

            entity.HasOne(d => d.Cliente).WithMany(p => p.Orden)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Orden__ClienteId__4BAC3F29");

            entity.HasOne(d => d.Evento).WithMany(p => p.Orden).HasConstraintName("FK__Orden__EventoId__4CA06362");

            entity.HasOne(d => d.Usuario).WithMany(p => p.Orden)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Orden__UsuarioId__4AB81AF0");
        });

        modelBuilder.Entity<Producto>(entity =>
        {
            entity.HasKey(e => e.ProductoId).HasName("PK__Producto__A430AEA389292D2E");

            entity.HasOne(d => d.Categoria).WithMany(p => p.Producto).HasConstraintName("FK__Producto__Catego__46E78A0C");

            entity.HasOne(d => d.Color).WithMany(p => p.Producto).HasConstraintName("FK__Producto__ColorI__45F365D3");

            entity.HasOne(d => d.Familia).WithMany(p => p.Producto).HasConstraintName("FK__Producto__Famili__47DBAE45");
        });

        modelBuilder.Entity<Rol>(entity =>
        {
            entity.HasKey(e => e.RolId).HasName("PK__Rol__F92302F1173F92E9");

            entity.Property(e => e.RolId).ValueGeneratedNever();
        });

        modelBuilder.Entity<Segmento>(entity =>
        {
            entity.HasKey(e => e.SegmentoId).HasName("PK__Segmento__DC1DD0F3DF2310FC");
        });

        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.HasKey(e => e.UsuarioId).HasName("PK__Usuario__2B3DE7B8B0BCF1B0");

            entity.Property(e => e.UsuarioId).ValueGeneratedNever();

            entity.HasOne(d => d.Rol).WithMany(p => p.Usuario).HasConstraintName("FK__Usuario__RolId__44FF419A");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
