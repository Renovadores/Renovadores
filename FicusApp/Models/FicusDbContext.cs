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

    public virtual DbSet<HistorialRefreshToken> HistorialRefreshTokens { get; set; }

    public virtual DbSet<UsuarioA> Usuarios { get; set; }


    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=KEVIN\\BD_KEVIN; DataBase=Ficus; Integrated Security=True; TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Categoria>(entity =>
        {
            entity.HasKey(e => e.IdCategoria).HasName("PK__Categori__02AA078528A03A6A");

            entity.Property(e => e.IdCategoria).ValueGeneratedNever();
        });

        modelBuilder.Entity<Cliente>(entity =>
        {
            entity.HasKey(e => e.IdCliente).HasName("PK__Cliente__E005FBFF347E236D");

            entity.Property(e => e.IdCliente).ValueGeneratedNever();

            entity.HasOne(d => d.ResponsableNavigation).WithMany(p => p.Cliente).HasConstraintName("FK__Cliente__Respons__60A75C0F");
        });

        modelBuilder.Entity<ClienteComunicacion>(entity =>
        {
            entity.HasOne(d => d.ClienteNavigation).WithMany().HasConstraintName("FK__Cliente_C__Clien__6383C8BA");

            entity.HasOne(d => d.MedioNavigation).WithMany().HasConstraintName("FK__Cliente_C__Medio__6477ECF3");
        });

        modelBuilder.Entity<ClienteSegmento>(entity =>
        {
            entity.HasOne(d => d.ClienteNavigation).WithMany()
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Cliente_S__Clien__619B8048");

            entity.HasOne(d => d.SegmentoNavigation).WithMany()
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Cliente_S__Segme__628FA481");
        });

        modelBuilder.Entity<Color>(entity =>
        {
            entity.HasKey(e => e.IdColor).HasName("PK__Color__6E7EBE7C9E619AD7");

            entity.Property(e => e.IdColor).ValueGeneratedNever();
        });

        modelBuilder.Entity<Detalle>(entity =>
        {
            entity.HasKey(e => e.IdReserva).HasName("PK__Detalle__CD692CB0FC31A0FB");

            entity.HasOne(d => d.IdReservaNavigation).WithOne(p => p.Detalle)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Detalle__ID_rese__5EBF139D");

            entity.HasOne(d => d.ProductoNavigation).WithMany(p => p.Detalle).HasConstraintName("FK__Detalle__Product__5FB337D6");
        });

        modelBuilder.Entity<Estado>(entity =>
        {
            entity.HasKey(e => e.IdEstado).HasName("PK__Estado__9CF49395660D5CE0");

            entity.Property(e => e.IdEstado).ValueGeneratedNever();
        });

        modelBuilder.Entity<Evento>(entity =>
        {
            entity.HasKey(e => e.IdEvento).HasName("PK__Evento__929BD0C158F46136");

            entity.Property(e => e.IdEvento).ValueGeneratedNever();

            entity.HasOne(d => d.OrdenNavigation).WithMany(p => p.Evento).HasConstraintName("FK__Evento__Orden__5BE2A6F2");
        });

        modelBuilder.Entity<Familia>(entity =>
        {
            entity.HasKey(e => e.IdFamilia).HasName("PK__Familia__1DA11CE8CE1AECCF");

            entity.Property(e => e.IdFamilia).ValueGeneratedNever();
        });

        modelBuilder.Entity<Fase>(entity =>
        {
            entity.HasKey(e => e.IdFase).HasName("PK__Fase__65509291DDC8D413");

            entity.Property(e => e.IdFase).ValueGeneratedNever();
        });

        modelBuilder.Entity<HistorialOrden>(entity =>
        {
            entity.HasOne(d => d.FaseNavigation).WithMany()
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Historial___Fase__5DCAEF64");

            entity.HasOne(d => d.OrdenNavigation).WithMany()
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Historial__Orden__5CD6CB2B");
        });

        modelBuilder.Entity<Inventario>(entity =>
        {
            entity.HasOne(d => d.EstadoNavigation).WithMany().HasConstraintName("FK__Inventari__Estad__59063A47");

            entity.HasOne(d => d.ProductoNavigation).WithMany().HasConstraintName("FK__Inventari__Produ__5812160E");
        });

        modelBuilder.Entity<MedioComunicacion>(entity =>
        {
            entity.HasKey(e => e.IdMedio).HasName("PK__MedioCom__397340CE50ADF3CF");
        });

        modelBuilder.Entity<Orden>(entity =>
        {
            entity.HasKey(e => e.IdOrden).HasName("PK__Orden__EC9FA9499B826A8D");

            entity.HasOne(d => d.ClienteNavigation).WithMany(p => p.Orden)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Orden__Cliente__5AEE82B9");

            entity.HasOne(d => d.UsuarioNavigation).WithMany(p => p.Orden)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Orden__Usuario__59FA5E80");
        });

        modelBuilder.Entity<Producto>(entity =>
        {
            entity.HasKey(e => e.Sku).HasName("PK__Producto__CA1ECF0C1A06FEAB");

            entity.HasOne(d => d.CategoriaNavigation).WithMany(p => p.Producto).HasConstraintName("FK__Producto__Catego__5535A963");

            entity.HasOne(d => d.ColorNavigation).WithMany(p => p.Producto).HasConstraintName("FK__Producto__Color__571DF1D5");

            entity.HasOne(d => d.FamiliaNavigation).WithMany(p => p.Producto).HasConstraintName("FK__Producto__Famili__5629CD9C");
        });

        modelBuilder.Entity<Rol>(entity =>
        {
            entity.HasKey(e => e.IdRol).HasName("PK__Rol__202AD2200DDF9F95");

            entity.Property(e => e.IdRol).ValueGeneratedNever();
        });

        modelBuilder.Entity<Segmento>(entity =>
        {
            entity.HasKey(e => e.IdSegmento).HasName("PK__Segmento__A28E26A78B790B27");
        });

        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.HasKey(e => e.IdUsuario).HasName("PK__Usuario__DE4431C5AFF4A902");

            entity.Property(e => e.IdUsuario).ValueGeneratedNever();

            entity.HasOne(d => d.IdRolNavigation).WithMany(p => p.Usuario).HasConstraintName("FK__Usuario__ID_Rol__5441852A");
        });

        modelBuilder.Entity<HistorialRefreshToken>(entity =>
        {
            entity.HasKey(e => e.IdHistorialToken).HasName("PK__Historia__03DC48A5BDFD22AD");

            entity.ToTable("HistorialRefreshToken");

            entity.Property(e => e.EsActivo).HasComputedColumnSql("(case when [FechaExpiracion]<getdate() then CONVERT([bit],(0)) else CONVERT([bit],(1)) end)", false);
            entity.Property(e => e.FechaCreacion).HasColumnType("datetime");
            entity.Property(e => e.FechaExpiracion).HasColumnType("datetime");
            entity.Property(e => e.RefreshToken)
                .HasMaxLength(200)
                .IsUnicode(false);
            entity.Property(e => e.Token)
                .HasMaxLength(500)
                .IsUnicode(false);

            entity.HasOne(d => d.IdUsuarioNavigation).WithMany(p => p.HistorialRefreshTokens)
                .HasForeignKey(d => d.IdUsuario)
                .HasConstraintName("FK__Historial__IdUsu__24927208");
        });

        modelBuilder.Entity<UsuarioA>(entity =>
        {
            entity.HasKey(e => e.IdUsuario).HasName("PK__UsuarioA__5B65BF97DFCD515C");

            entity.ToTable("UsuarioA");

            entity.Property(e => e.Clave)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.NombreUsuario)
                .HasMaxLength(20)
                .IsUnicode(false);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
