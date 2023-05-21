using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace FicusApp.Models;

public partial class Producto
{
    [Key]
    [Column("SKU")]
    [StringLength(255)]
    public string Sku { get; set; } = null!;

    [StringLength(255)]
    public string? Nombre { get; set; }

    public int? Color { get; set; }

    [StringLength(255)]
    public string? Descripcion { get; set; }

    [StringLength(255)]
    public string? Dimensiones { get; set; }

    [Column("Peso_recipiente")]
    public int? PesoRecipiente { get; set; }

    [Column("Peso_desechable")]
    public int? PesoDesechable { get; set; }

    [Column("Alquiler_Comercios")]
    public int? AlquilerComercios { get; set; }

    [Column("Alquiler_Retail")]
    public int? AlquilerRetail { get; set; }

    public int? Categoria { get; set; }

    public int? Familia { get; set; }

    [StringLength(255)]
    public string? Imagen { get; set; }

    [ForeignKey("Categoria")]
    [InverseProperty("Producto")]
    public virtual Categoria? CategoriaNavigation { get; set; }

    [ForeignKey("Color")]
    [InverseProperty("Producto")]
    public virtual Color? ColorNavigation { get; set; }

    [InverseProperty("ProductoNavigation")]
    public virtual ICollection<Detalle> Detalle { get; set; } = new List<Detalle>();

    [ForeignKey("Familia")]
    [InverseProperty("Producto")]
    public virtual Familia? FamiliaNavigation { get; set; }
}
