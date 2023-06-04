using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace FicusApp.Models;

public partial class Producto
{
    [Key]
    [StringLength(255)]
    public string sku { get; set; } = null!;

    [StringLength(255)]
    public string? nombre { get; set; }

    public int? color { get; set; }

    [StringLength(255)]
    public string? descripcion { get; set; }

    [StringLength(255)]
    public string? dimensiones { get; set; }

    public int? peso_recipiente { get; set; }

    public int? peso_desechable { get; set; }

    public int? alquiler_Comercios { get; set; }

    public int? alquiler_Retail { get; set; }

    public int? categoria { get; set; }

    public int? familia { get; set; }

    [StringLength(255)]
    public string? imagen { get; set; }

    [InverseProperty("productoNavigation")]
    public virtual ICollection<Detalle> Detalle { get; set; } = new List<Detalle>();

    [InverseProperty("productoNavigation")]
    public virtual ICollection<Inventario> Inventario { get; set; } = new List<Inventario>();

    [ForeignKey("categoria")]
    [InverseProperty("Producto")]
    public virtual Categoria? categoriaNavigation { get; set; }

    [ForeignKey("color")]
    [InverseProperty("Producto")]
    public virtual Color? colorNavigation { get; set; }

    [ForeignKey("familia")]
    [InverseProperty("Producto")]
    public virtual Familia? familiaNavigation { get; set; }
}
