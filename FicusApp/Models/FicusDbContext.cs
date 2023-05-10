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

    public virtual DbSet<Categorium> Categoria { get; set; }

    public virtual DbSet<Cliente> Clientes { get; set; }

    public virtual DbSet<Cliente_Comunicacion> Cliente_Comunicacions { get; set; }

    public virtual DbSet<Cliente_Segmento> Cliente_Segmentos { get; set; }

    public virtual DbSet<Color> Colors { get; set; }

    public virtual DbSet<Estado> Estados { get; set; }

    public virtual DbSet<Familium> Familia { get; set; }

    public virtual DbSet<Inventario> Inventarios { get; set; }

    public virtual DbSet<MedioComunicacion> MedioComunicacions { get; set; }

    public virtual DbSet<Producto> Productos { get; set; }

    public virtual DbSet<Rol> Rols { get; set; }

    public virtual DbSet<Segmento> Segmentos { get; set; }

    public virtual DbSet<Usuario> Usuarios { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=172.17.0.2;User id=sa;password=Hola1234;MultipleActiveResultSets=true;TrustServerCertificate=True");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Categorium>(entity =>
        {
            entity.HasKey(e => e.ID_Categoria).HasName("PK__Categori__02AA0785E72A1DE4");

            entity.Property(e => e.ID_Categoria).ValueGeneratedNever();
            entity.Property(e => e.Nombre_categoria).HasMaxLength(255);
        });

        modelBuilder.Entity<Cliente>(entity =>
        {
            entity.HasKey(e => e.ID_Cliente).HasName("PK__Cliente__E005FBFF7F8C1CA1");

            entity.ToTable("Cliente");

            entity.Property(e => e.ID_Cliente).ValueGeneratedNever();
            entity.Property(e => e.Contacto).HasMaxLength(255);
            entity.Property(e => e.Correo).HasMaxLength(255);
            entity.Property(e => e.Estado).HasMaxLength(255);
            entity.Property(e => e.Fecha_agregado).HasColumnType("date");
            entity.Property(e => e.Nombre_empresa).HasMaxLength(255);
            entity.Property(e => e.Prioridad).HasMaxLength(255);
            entity.Property(e => e.Web).HasMaxLength(255);

            entity.HasOne(d => d.ResponsableNavigation).WithMany(p => p.Clientes)
                .HasForeignKey(d => d.Responsable)
                .HasConstraintName("FK__Cliente__Respons__3B95D2F1");
        });

        modelBuilder.Entity<Cliente_Comunicacion>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("Cliente_Comunicacion");

            entity.Property(e => e.Medio).HasMaxLength(255);

            entity.HasOne(d => d.ClienteNavigation).WithMany()
                .HasForeignKey(d => d.Cliente)
                .HasConstraintName("FK__Cliente_C__Clien__3E723F9C");

            entity.HasOne(d => d.MedioNavigation).WithMany()
                .HasForeignKey(d => d.Medio)
                .HasConstraintName("FK__Cliente_C__Medio__3F6663D5");
        });

        modelBuilder.Entity<Cliente_Segmento>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("Cliente_Segmento");

            entity.Property(e => e.Segmento).HasMaxLength(255);

            entity.HasOne(d => d.ClienteNavigation).WithMany()
                .HasForeignKey(d => d.Cliente)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Cliente_S__Clien__3C89F72A");

            entity.HasOne(d => d.SegmentoNavigation).WithMany()
                .HasForeignKey(d => d.Segmento)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Cliente_S__Segme__3D7E1B63");
        });

        modelBuilder.Entity<Color>(entity =>
        {
            entity.HasKey(e => e.ID_Color).HasName("PK__Color__6E7EBE7C9F65A905");

            entity.ToTable("Color");

            entity.Property(e => e.ID_Color).ValueGeneratedNever();
            entity.Property(e => e.Descripcion).HasMaxLength(255);
        });

        modelBuilder.Entity<Estado>(entity =>
        {
            entity.HasKey(e => e.ID_Estado).HasName("PK__Estado__9CF49395FD37CA10");

            entity.ToTable("Estado");

            entity.Property(e => e.ID_Estado).ValueGeneratedNever();
            entity.Property(e => e.Descripcion_estadoproducto).HasMaxLength(255);
        });

        modelBuilder.Entity<Familium>(entity =>
        {
            entity.HasKey(e => e.ID_Familia).HasName("PK__Familia__1DA11CE852776B31");

            entity.Property(e => e.ID_Familia).ValueGeneratedNever();
            entity.Property(e => e.Nombre_familia).HasMaxLength(255);
        });

        modelBuilder.Entity<Inventario>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("Inventario");

            entity.Property(e => e.Fecha_ingreso).HasColumnType("date");
            entity.Property(e => e.Producto).HasMaxLength(255);

            entity.HasOne(d => d.EstadoNavigation).WithMany()
                .HasForeignKey(d => d.Estado)
                .HasConstraintName("FK__Inventari__Estad__33F4B129");

            entity.HasOne(d => d.ProductoNavigation).WithMany()
                .HasForeignKey(d => d.Producto)
                .HasConstraintName("FK__Inventari__Produ__33008CF0");
        });

        modelBuilder.Entity<MedioComunicacion>(entity =>
        {
            entity.HasKey(e => e.ID_Medio).HasName("PK__MedioCom__397340CE0DED3CCB");

            entity.ToTable("MedioComunicacion");

            entity.Property(e => e.ID_Medio).HasMaxLength(255);
            entity.Property(e => e.Caracteristicas).HasMaxLength(255);
        });

        modelBuilder.Entity<Producto>(entity =>
        {
            entity.HasKey(e => e.SKU).HasName("PK__Producto__CA1ECF0CED13495C");

            entity.ToTable("Producto");

            entity.Property(e => e.SKU).HasMaxLength(255);
            entity.Property(e => e.Descripcion).HasMaxLength(255);
            entity.Property(e => e.Dimensiones).HasMaxLength(255);
            entity.Property(e => e.Imagen).HasMaxLength(255);
            entity.Property(e => e.Nombre).HasMaxLength(255);

            entity.HasOne(d => d.CategoriaNavigation).WithMany(p => p.Productos)
                .HasForeignKey(d => d.Categoria)
                .HasConstraintName("FK__Producto__Catego__30242045");

            entity.HasOne(d => d.ColorNavigation).WithMany(p => p.Productos)
                .HasForeignKey(d => d.Color)
                .HasConstraintName("FK__Producto__Color__320C68B7");

            entity.HasOne(d => d.FamiliaNavigation).WithMany(p => p.Productos)
                .HasForeignKey(d => d.Familia)
                .HasConstraintName("FK__Producto__Famili__3118447E");
        });

        modelBuilder.Entity<Rol>(entity =>
        {
            entity.HasKey(e => e.ID_Rol).HasName("PK__Rol__202AD2200EC0A8C8");

            entity.ToTable("Rol");

            entity.Property(e => e.ID_Rol).ValueGeneratedNever();
            entity.Property(e => e.Detalles_rol).HasMaxLength(255);
            entity.Property(e => e.Tipo_rol).HasMaxLength(255);
        });

        modelBuilder.Entity<Segmento>(entity =>
        {
            entity.HasKey(e => e.ID_Segmento).HasName("PK__Segmento__A28E26A761425DC6");

            entity.ToTable("Segmento");

            entity.Property(e => e.ID_Segmento).HasMaxLength(255);
            entity.Property(e => e.Detalles).HasMaxLength(255);
        });

        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.HasKey(e => e.ID_Usuario).HasName("PK__Usuario__DE4431C5A6F54311");

            entity.ToTable("Usuario");

            entity.Property(e => e.ID_Usuario).ValueGeneratedNever();
            entity.Property(e => e.Apellidos).HasMaxLength(255);
            entity.Property(e => e.Contrasena).HasMaxLength(255);
            entity.Property(e => e.Nombre).HasMaxLength(255);

            entity.HasOne(d => d.ID_RolNavigation).WithMany(p => p.Usuarios)
                .HasForeignKey(d => d.ID_Rol)
                .HasConstraintName("FK__Usuario__ID_Rol__2F2FFC0C");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
