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

    public virtual DbSet<Historial_Orden> Historial_Orden { get; set; }

    public virtual DbSet<Inventario> Inventario { get; set; }

    public virtual DbSet<MedioComunicacion> MedioComunicacion { get; set; }

    public virtual DbSet<Orden> Orden { get; set; }

    public virtual DbSet<Producto> Producto { get; set; }

    public virtual DbSet<Rol> Rol { get; set; }

    public virtual DbSet<Segmento> Segmento { get; set; }

    public virtual DbSet<Usuario> Usuario { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=172.17.0.2;User id=sa;password=Hola1234;Database=Ficus;MultipleActiveResultSets=true;TrustServerCertificate=True");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Categoria>(entity =>
        {
            entity.HasKey(e => e.id_categoria).HasName("PK__Categori__CD54BC5ADB3958EB");

            entity.Property(e => e.id_categoria).ValueGeneratedNever();
        });

        modelBuilder.Entity<Cliente>(entity =>
        {
            entity.HasKey(e => e.id_cliente).HasName("PK__Cliente__677F38F53B4B613B");

            entity.Property(e => e.id_cliente).ValueGeneratedNever();

            entity.HasOne(d => d.responsableNavigation).WithMany(p => p.Cliente).HasConstraintName("FK__Cliente__respons__5165187F");

            entity.HasMany(d => d.medio).WithMany(p => p.cliente)
                .UsingEntity<Dictionary<string, object>>(
                    "Cliente_Comunicacion",
                    r => r.HasOne<MedioComunicacion>().WithMany()
                        .HasForeignKey("medio")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__Cliente_C__medio__5535A963"),
                    l => l.HasOne<Cliente>().WithMany()
                        .HasForeignKey("cliente")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__Cliente_C__clien__5441852A"),
                    j =>
                    {
                        j.HasKey("cliente", "medio").HasName("PK__Cliente___D2175D00585858DC");
                        j.IndexerProperty<string>("medio").HasMaxLength(255);
                    });

            entity.HasMany(d => d.segmento).WithMany(p => p.cliente)
                .UsingEntity<Dictionary<string, object>>(
                    "Cliente_Segmento",
                    r => r.HasOne<Segmento>().WithMany()
                        .HasForeignKey("segmento")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__Cliente_S__segme__534D60F1"),
                    l => l.HasOne<Cliente>().WithMany()
                        .HasForeignKey("cliente")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__Cliente_S__clien__52593CB8"),
                    j =>
                    {
                        j.HasKey("cliente", "segmento").HasName("PK__Cliente___E5A83F9C6701DC11");
                        j.IndexerProperty<string>("segmento").HasMaxLength(255);
                    });
        });

        modelBuilder.Entity<Color>(entity =>
        {
            entity.HasKey(e => e.id_color).HasName("PK__Color__7CF2AF03F395878D");

            entity.Property(e => e.id_color).ValueGeneratedNever();
        });

        modelBuilder.Entity<Detalle>(entity =>
        {
            entity.HasKey(e => new { e.id_reserva, e.producto }).HasName("PK__Detalle__9BE904A54C7E986A");

            entity.HasOne(d => d.id_reservaNavigation).WithMany(p => p.Detalle)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Detalle__id_rese__4F7CD00D");

            entity.HasOne(d => d.productoNavigation).WithMany(p => p.Detalle)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Detalle__product__5070F446");
        });

        modelBuilder.Entity<Estado>(entity =>
        {
            entity.HasKey(e => e.id_estado).HasName("PK__Estado__86989FB28BCA4268");

            entity.Property(e => e.id_estado).ValueGeneratedNever();
        });

        modelBuilder.Entity<Evento>(entity =>
        {
            entity.HasKey(e => e.id_evento).HasName("PK__Evento__AF150CA572A31C7B");

            entity.Property(e => e.id_evento).ValueGeneratedNever();
        });

        modelBuilder.Entity<Familia>(entity =>
        {
            entity.HasKey(e => e.id_familia).HasName("PK__Familia__609C4852F621C3D6");

            entity.Property(e => e.id_familia).ValueGeneratedNever();
        });

        modelBuilder.Entity<Fase>(entity =>
        {
            entity.HasKey(e => e.id_fase).HasName("PK__Fase__66E1C293A0355C78");

            entity.Property(e => e.id_fase).ValueGeneratedNever();
        });

        modelBuilder.Entity<Historial_Orden>(entity =>
        {
            entity.HasKey(e => new { e.orden, e.fase }).HasName("PK__Historia__A22FFBC44E4B8789");

            entity.HasOne(d => d.faseNavigation).WithMany(p => p.Historial_Orden)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Historial___fase__4E88ABD4");

            entity.HasOne(d => d.ordenNavigation).WithMany(p => p.Historial_Orden)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Historial__orden__4D94879B");
        });

        modelBuilder.Entity<Inventario>(entity =>
        {
            entity.HasKey(e => new { e.producto, e.estado }).HasName("PK__Inventar__F959987D97883427");

            entity.HasOne(d => d.estadoNavigation).WithMany(p => p.Inventario)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Inventari__estad__49C3F6B7");

            entity.HasOne(d => d.productoNavigation).WithMany(p => p.Inventario)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Inventari__produ__48CFD27E");
        });

        modelBuilder.Entity<MedioComunicacion>(entity =>
        {
            entity.HasKey(e => e.id_medio).HasName("PK__MedioCom__2112D17E2E637EF5");
        });

        modelBuilder.Entity<Orden>(entity =>
        {
            entity.HasKey(e => e.id_orden).HasName("PK__Orden__DD5B8F331EBDB63F");

            entity.HasOne(d => d.clienteNavigation).WithMany(p => p.Orden)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Orden__cliente__4BAC3F29");

            entity.HasOne(d => d.eventoNavigation).WithMany(p => p.Orden).HasConstraintName("FK__Orden__evento__4CA06362");

            entity.HasOne(d => d.usuarioNavigation).WithMany(p => p.Orden)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Orden__usuario__4AB81AF0");
        });

        modelBuilder.Entity<Producto>(entity =>
        {
            entity.HasKey(e => e.sku).HasName("PK__Producto__DDDF4BE6E43A203E");

            entity.HasOne(d => d.categoriaNavigation).WithMany(p => p.Producto).HasConstraintName("FK__Producto__catego__45F365D3");

            entity.HasOne(d => d.colorNavigation).WithMany(p => p.Producto).HasConstraintName("FK__Producto__color__47DBAE45");

            entity.HasOne(d => d.familiaNavigation).WithMany(p => p.Producto).HasConstraintName("FK__Producto__famili__46E78A0C");
        });

        modelBuilder.Entity<Rol>(entity =>
        {
            entity.HasKey(e => e.id_rol).HasName("PK__Rol__6ABCB5E0A1993645");

            entity.Property(e => e.id_rol).ValueGeneratedNever();
        });

        modelBuilder.Entity<Segmento>(entity =>
        {
            entity.HasKey(e => e.id_segmento).HasName("PK__Segmento__ACCB330080658750");
        });

        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.HasKey(e => e.id_usuario).HasName("PK__Usuario__4E3E04ADA337E76D");

            entity.Property(e => e.id_usuario).ValueGeneratedNever();

            entity.HasOne(d => d.id_rolNavigation).WithMany(p => p.Usuario).HasConstraintName("FK__Usuario__id_rol__44FF419A");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
