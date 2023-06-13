using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace FicusApp.Models;

[Keyless]
public partial class Inventario
{
    public int? InventarioId { get; set; }

    [StringLength(255)]
    public string? ProductoId { get; set; }

    public int? Cantidad { get; set; }

    public int? Lote { get; set; }

    [Column(TypeName = "date")]
    public DateTime? FechaIngreso { get; set; }

    [ForeignKey("ProductoId")]
    public virtual Producto? Producto { get; set; }
}
