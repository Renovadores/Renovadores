using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace FicusApp.Models;

[Keyless]
public partial class Inventario
{
    [StringLength(255)]
    public string? Producto { get; set; }

    public int? Estado { get; set; }

    public int? Cantidad { get; set; }

    public int? Lote { get; set; }

    [Column("Fecha_ingreso", TypeName = "date")]
    public DateTime? FechaIngreso { get; set; }

    [ForeignKey("Estado")]
    public virtual Estado? EstadoNavigation { get; set; }

    [ForeignKey("Producto")]
    public virtual Producto? ProductoNavigation { get; set; }
}
