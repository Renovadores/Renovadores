using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace FicusApp.Models;

[PrimaryKey("ProductoId", "EstadoId")]
public partial class Inventario
{
    [Key]
    [StringLength(255)]
    public string ProductoId { get; set; } = null!;

    [Key]
    public int EstadoId { get; set; }

    public int? Cantidad { get; set; }

    public int? Lote { get; set; }

    [Column(TypeName = "date")]
    public DateTime? FechaIngreso { get; set; }

    [ForeignKey("EstadoId")]
    [InverseProperty("Inventario")]
    public virtual Estado Estado { get; set; } = null!;

    [ForeignKey("ProductoId")]
    [InverseProperty("Inventario")]
    public virtual Producto Producto { get; set; } = null!;
}
