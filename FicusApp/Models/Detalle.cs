using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace FicusApp.Models;

[PrimaryKey("OrdenId", "ProductoId")]
public partial class Detalle
{
    [Key]
    public int OrdenId { get; set; }

    [Key]
    [StringLength(255)]
    public string ProductoId { get; set; } = null!;

    public int? Pedidos { get; set; }

    public int? SinUsar { get; set; }

    public int? Usados { get; set; }

    public int? Devueltos { get; set; }

    public int? Descuento { get; set; }

    [ForeignKey("OrdenId")]
    [InverseProperty("Detalle")]
    public virtual Orden? Orden { get; set; } = null!;

    [ForeignKey("ProductoId")]
    [InverseProperty("Detalle")]
    public virtual Producto? Producto { get; set; } = null!;
}
