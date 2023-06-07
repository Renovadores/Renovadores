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
            entity.HasKey(e => e.CategoriaId).HasName("PK__Categori__F353C1E50ED8F95A");

            entity.Property(e => e.CategoriaId).ValueGeneratedNever();
        });

        modelBuilder.Entity<Cliente>(entity =>
        {
            entity.HasKey(e => e.ClienteId).HasName("PK__Cliente__71ABD087FB11448C");

            entity.Property(e => e.ClienteId).ValueGeneratedNever();

            entity.HasOne(d => d.Responsable).WithMany(p => p.Cliente).HasConstraintName("FK__Cliente__Respons__6477ECF3");
        });

        modelBuilder.Entity<ClienteComunicacion>(entity =>
        {
            entity.HasKey(e => e.ClienteComunicacionId).HasName("PK__ClienteC__BA07486E3866A5E6");

            entity.HasOne(d => d.Cliente).WithMany(p => p.ClienteComunicacion).HasConstraintName("FK__ClienteCo__Clien__6754599E");

            entity.HasOne(d => d.Medio).WithMany(p => p.ClienteComunicacion).HasConstraintName("FK__ClienteCo__Medio__68487DD7");
        });

        modelBuilder.Entity<ClienteSegmento>(entity =>
        {
            entity.HasKey(e => e.ClienteSegmentoId).HasName("PK__ClienteS__644B5531B1517CB0");

            entity.HasOne(d => d.Cliente).WithMany(p => p.ClienteSegmento)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__ClienteSe__Clien__656C112C");

            entity.HasOne(d => d.Segmento).WithMany(p => p.ClienteSegmento)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__ClienteSe__Segme__66603565");
        });

        modelBuilder.Entity<Color>(entity =>
        {
            entity.HasKey(e => e.ColorId).HasName("PK__Color__8DA7674DB7658523");

            entity.Property(e => e.ColorId).ValueGeneratedNever();
        });

        modelBuilder.Entity<Detalle>(entity =>
        {
            entity.HasKey(e => new { e.OrdenId, e.ProductoId }).HasName("PK__Detalle__EACBAFEE4D469CF0");

            entity.HasOne(d => d.Orden).WithMany(p => p.Detalle)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Detalle__OrdenId__628FA481");

            entity.HasOne(d => d.Producto).WithMany(p => p.Detalle)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Detalle__Product__6383C8BA");
        });

        modelBuilder.Entity<Estado>(entity =>
        {
            entity.HasKey(e => e.EstadoId).HasName("PK__Estado__FEF86B00A2195F9D");

            entity.Property(e => e.EstadoId).ValueGeneratedNever();
        });

        modelBuilder.Entity<Evento>(entity =>
        {
            entity.HasKey(e => e.EventoId).HasName("PK__Evento__1EEB5921DB2AF929");

            entity.Property(e => e.EventoId).ValueGeneratedNever();
        });

        modelBuilder.Entity<Familia>(entity =>
        {
            entity.HasKey(e => e.FamiliaId).HasName("PK__Familia__42DFCCC4CFAF1C09");

            entity.Property(e => e.FamiliaId).ValueGeneratedNever();
        });

        modelBuilder.Entity<Fase>(entity =>
        {
            entity.HasKey(e => e.FaseId).HasName("PK__Fase__D0434875EC6FB471");

            entity.Property(e => e.FaseId).ValueGeneratedNever();
        });

        modelBuilder.Entity<HistorialOrden>(entity =>
        {
            entity.HasKey(e => new { e.OrdenId, e.FaseId }).HasName("PK__Historia__8D8C91835B72D150");

            entity.HasOne(d => d.Fase).WithMany(p => p.HistorialOrden)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Historial__FaseI__619B8048");

            entity.HasOne(d => d.Orden).WithMany(p => p.HistorialOrden)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Historial__Orden__60A75C0F");
        });

        modelBuilder.Entity<Inventario>(entity =>
        {
            entity.HasKey(e => new { e.ProductoId, e.EstadoId }).HasName("PK__Inventar__BBDF28139451B1EA");

            entity.HasOne(d => d.Estado).WithMany(p => p.Inventario)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Inventari__Estad__5CD6CB2B");

            entity.HasOne(d => d.Producto).WithMany(p => p.Inventario)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Inventari__Produ__5BE2A6F2");
        });

        modelBuilder.Entity<MedioComunicacion>(entity =>
        {
            entity.HasKey(e => e.MedioId).HasName("PK__MedioCom__26B59BB6B715991A");
        });

        modelBuilder.Entity<Orden>(entity =>
        {
            entity.HasKey(e => e.OrdenId).HasName("PK__Orden__C088A504A04804AD");

            entity.Property(e => e.OrdenId).ValueGeneratedNever();

            entity.HasOne(d => d.Cliente).WithMany(p => p.Orden)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Orden__ClienteId__5EBF139D");

            entity.HasOne(d => d.Evento).WithMany(p => p.Orden).HasConstraintName("FK__Orden__EventoId__5FB337D6");

            entity.HasOne(d => d.Usuario).WithMany(p => p.Orden)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Orden__UsuarioId__5DCAEF64");
        });

        modelBuilder.Entity<Producto>(entity =>
        {
            entity.HasKey(e => e.ProductoId).HasName("PK__Producto__A430AEA39E7236CB");

            entity.HasOne(d => d.Categoria).WithMany(p => p.Producto).HasConstraintName("FK__Producto__Catego__59FA5E80");

            entity.HasOne(d => d.Color).WithMany(p => p.Producto).HasConstraintName("FK__Producto__ColorI__59063A47");

            entity.HasOne(d => d.Familia).WithMany(p => p.Producto).HasConstraintName("FK__Producto__Famili__5AEE82B9");
        });

        modelBuilder.Entity<Rol>(entity =>
        {
            entity.HasKey(e => e.RolId).HasName("PK__Rol__F92302F16A66EF40");

            entity.Property(e => e.RolId).ValueGeneratedNever();
        });

        modelBuilder.Entity<Segmento>(entity =>
        {
            entity.HasKey(e => e.SegmentoId).HasName("PK__Segmento__DC1DD0F34E9B3377");
        });

        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.HasKey(e => e.UsuarioId).HasName("PK__Usuario__2B3DE7B87C450583");

            entity.Property(e => e.UsuarioId).ValueGeneratedNever();

            entity.HasOne(d => d.Rol).WithMany(p => p.Usuario).HasConstraintName("FK__Usuario__RolId__5812160E");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
