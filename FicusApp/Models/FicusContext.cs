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

    public virtual DbSet<Cliente_Comunicacion> Cliente_Comunicacion { get; set; }

    public virtual DbSet<Cliente_Segmento> Cliente_Segmento { get; set; }

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
        => optionsBuilder.UseSqlServer("Server=DESKTOP-7EIA8UC; DataBase=FicusDataBase; Integrated Security=True; TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Categoria>(entity =>
        {
            entity.HasKey(e => e.ID_Categoria).HasName("PK__Categori__02AA07858E2F7C00");

            entity.Property(e => e.ID_Categoria).ValueGeneratedNever();
            entity.Property(e => e.Nombre_categoria).HasMaxLength(255);
        });

        modelBuilder.Entity<Cliente>(entity =>
        {
            entity.HasKey(e => e.ID_Cliente).HasName("PK__Cliente__E005FBFF88E465D3");

            entity.Property(e => e.ID_Cliente).ValueGeneratedNever();
            entity.Property(e => e.Contacto).HasMaxLength(255);
            entity.Property(e => e.Correo).HasMaxLength(255);
            entity.Property(e => e.Estado).HasMaxLength(255);
            entity.Property(e => e.Fecha_agregado).HasColumnType("date");
            entity.Property(e => e.Nombre_empresa).HasMaxLength(255);
            entity.Property(e => e.Prioridad).HasMaxLength(255);
            entity.Property(e => e.Web).HasMaxLength(255);

            entity.HasOne(d => d.ResponsableNavigation).WithMany(p => p.Cliente)
                .HasForeignKey(d => d.Responsable)
                .HasConstraintName("FK__Cliente__Respons__4D94879B");
        });

        modelBuilder.Entity<Cliente_Comunicacion>(entity =>
        {
            entity.HasNoKey();

            entity.Property(e => e.Medio).HasMaxLength(255);

            entity.HasOne(d => d.ClienteNavigation).WithMany()
                .HasForeignKey(d => d.Cliente)
                .HasConstraintName("FK__Cliente_C__Clien__5070F446");

            entity.HasOne(d => d.MedioNavigation).WithMany()
                .HasForeignKey(d => d.Medio)
                .HasConstraintName("FK__Cliente_C__Medio__5165187F");
        });

        modelBuilder.Entity<Cliente_Segmento>(entity =>
        {
            entity.HasNoKey();

            entity.Property(e => e.Segmento).HasMaxLength(255);

            entity.HasOne(d => d.ClienteNavigation).WithMany()
                .HasForeignKey(d => d.Cliente)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Cliente_S__Clien__4E88ABD4");

            entity.HasOne(d => d.SegmentoNavigation).WithMany()
                .HasForeignKey(d => d.Segmento)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Cliente_S__Segme__4F7CD00D");
        });

        modelBuilder.Entity<Color>(entity =>
        {
            entity.HasKey(e => e.ID_Color).HasName("PK__Color__6E7EBE7C20D599A7");

            entity.Property(e => e.ID_Color).ValueGeneratedNever();
            entity.Property(e => e.Descripcion).HasMaxLength(255);
        });

        modelBuilder.Entity<Detalle>(entity =>
        {
            entity.HasKey(e => e.ID_reserva).HasName("PK__Detalle__CD692CB049BD3252");

            entity.Property(e => e.ID_reserva).HasMaxLength(255);
            entity.Property(e => e.Producto).HasMaxLength(255);

            entity.HasOne(d => d.ID_reservaNavigation).WithOne(p => p.Detalle)
                .HasForeignKey<Detalle>(d => d.ID_reserva)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Detalle__ID_rese__4BAC3F29");

            entity.HasOne(d => d.ProductoNavigation).WithMany(p => p.Detalle)
                .HasForeignKey(d => d.Producto)
                .HasConstraintName("FK__Detalle__Product__4CA06362");
        });

        modelBuilder.Entity<Estado>(entity =>
        {
            entity.HasKey(e => e.ID_Estado).HasName("PK__Estado__9CF493959C18DF81");

            entity.Property(e => e.ID_Estado).ValueGeneratedNever();
            entity.Property(e => e.Descripcion_estadoproducto).HasMaxLength(255);
        });

        modelBuilder.Entity<Evento>(entity =>
        {
            entity.HasKey(e => e.ID_Evento).HasName("PK__Evento__929BD0C1B33EE5E6");

            entity.Property(e => e.ID_Evento).ValueGeneratedNever();
            entity.Property(e => e.Descripcion_evento).HasMaxLength(255);
            entity.Property(e => e.Nombre_evento).HasMaxLength(255);
            entity.Property(e => e.Orden).HasMaxLength(255);

            entity.HasOne(d => d.OrdenNavigation).WithMany(p => p.Evento)
                .HasForeignKey(d => d.Orden)
                .HasConstraintName("FK__Evento__Orden__48CFD27E");
        });

        modelBuilder.Entity<Familia>(entity =>
        {
            entity.HasKey(e => e.ID_Familia).HasName("PK__Familia__1DA11CE88E1CC8C4");

            entity.Property(e => e.ID_Familia).ValueGeneratedNever();
            entity.Property(e => e.Nombre_familia).HasMaxLength(255);
        });

        modelBuilder.Entity<Fase>(entity =>
        {
            entity.HasKey(e => e.ID_Fase).HasName("PK__Fase__65509291F66EF7AB");

            entity.Property(e => e.ID_Fase).ValueGeneratedNever();
            entity.Property(e => e.Descripcion_estado).HasMaxLength(255);
        });

        modelBuilder.Entity<Historial_Orden>(entity =>
        {
            entity.HasNoKey();

            entity.Property(e => e.Final).HasColumnType("date");
            entity.Property(e => e.Inicio).HasColumnType("date");
            entity.Property(e => e.Orden).HasMaxLength(255);

            entity.HasOne(d => d.FaseNavigation).WithMany()
                .HasForeignKey(d => d.Fase)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Historial___Fase__4AB81AF0");

            entity.HasOne(d => d.OrdenNavigation).WithMany()
                .HasForeignKey(d => d.Orden)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Historial__Orden__49C3F6B7");
        });

        modelBuilder.Entity<Inventario>(entity =>
        {
            entity.HasKey(e => e.ID_Inventario);

            entity.Property(e => e.Fecha_ingreso).HasColumnType("date");
            entity.Property(e => e.Producto).HasMaxLength(255);

            entity.HasOne(d => d.EstadoNavigation)
                .WithMany()
                .HasForeignKey(d => d.Estado)
                .HasConstraintName("FK__Inventari__Estad__45F365D3");

            entity.HasOne(d => d.ProductoNavigation).WithMany()
                .HasForeignKey(d => d.Producto)
                .HasConstraintName("FK__Inventari__Produ__44FF419A");
        });

        // modelBuilder.Entity<Inventario>()
        //     .Navigation(e => e.EstadoNavigation)
        //     .AutoInclude();

        modelBuilder.Entity<MedioComunicacion>(entity =>
        {
            entity.HasKey(e => e.ID_Medio).HasName("PK__MedioCom__397340CE33110A4E");

            entity.Property(e => e.ID_Medio).HasMaxLength(255);
            entity.Property(e => e.Caracteristicas).HasMaxLength(255);
        });

        modelBuilder.Entity<Orden>(entity =>
        {
            entity.HasKey(e => e.ID_Orden).HasName("PK__Orden__EC9FA9496CC64255");

            entity.Property(e => e.ID_Orden).HasMaxLength(255);
            entity.Property(e => e.Fecha_alquiler).HasColumnType("date");

            entity.HasOne(d => d.ClienteNavigation).WithMany(p => p.Orden)
                .HasForeignKey(d => d.Cliente)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Orden__Cliente__47DBAE45");

            entity.HasOne(d => d.UsuarioNavigation).WithMany(p => p.Orden)
                .HasForeignKey(d => d.Usuario)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Orden__Usuario__46E78A0C");
        });

        modelBuilder.Entity<Producto>(entity =>
        {
            entity.HasKey(e => e.SKU).HasName("PK__Producto__CA1ECF0CA305D67A");

            entity.Property(e => e.SKU).HasMaxLength(255);
            entity.Property(e => e.Descripcion).HasMaxLength(255);
            entity.Property(e => e.Dimensiones).HasMaxLength(255);
            entity.Property(e => e.Imagen).HasMaxLength(255);
            entity.Property(e => e.Nombre).HasMaxLength(255);

            entity.HasOne(d => d.CategoriaNavigation).WithMany(p => p.Producto)
                .HasForeignKey(d => d.Categoria)
                .HasConstraintName("FK__Producto__Catego__4222D4EF");

            entity.HasOne(d => d.ColorNavigation).WithMany(p => p.Producto)
                .HasForeignKey(d => d.Color)
                .HasConstraintName("FK__Producto__Color__440B1D61");

            entity.HasOne(d => d.FamiliaNavigation).WithMany(p => p.Producto)
                .HasForeignKey(d => d.Familia)
                .HasConstraintName("FK__Producto__Famili__4316F928");
        });

        modelBuilder.Entity<Rol>(entity =>
        {
            entity.HasKey(e => e.ID_Rol).HasName("PK__Rol__202AD22090D289A3");

            entity.Property(e => e.ID_Rol).ValueGeneratedNever();
            entity.Property(e => e.Detalles_rol).HasMaxLength(255);
            entity.Property(e => e.Tipo_rol).HasMaxLength(255);
        });

        modelBuilder.Entity<Segmento>(entity =>
        {
            entity.HasKey(e => e.ID_Segmento).HasName("PK__Segmento__A28E26A7A1B58CB3");

            entity.Property(e => e.ID_Segmento).HasMaxLength(255);
            entity.Property(e => e.Detalles).HasMaxLength(255);
        });

        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.HasKey(e => e.ID_Usuario).HasName("PK__Usuario__DE4431C5D0E66D33");

            entity.Property(e => e.ID_Usuario).ValueGeneratedNever();
            entity.Property(e => e.Apellidos).HasMaxLength(255);
            entity.Property(e => e.Contrasena).HasMaxLength(255);
            entity.Property(e => e.Nombre).HasMaxLength(255);

            entity.HasOne(d => d.ID_RolNavigation).WithMany(p => p.Usuario)
                .HasForeignKey(d => d.ID_Rol)
                .HasConstraintName("FK__Usuario__ID_Rol__412EB0B6");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
