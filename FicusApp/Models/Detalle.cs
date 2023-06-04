using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace FicusApp.Models;

[PrimaryKey("id_reserva", "producto")]
public partial class Detalle
{
    [Key]
    [StringLength(255)]
    public string id_reserva { get; set; } = null!;

    [Key]
    [StringLength(255)]
    public string producto { get; set; } = null!;

    public int? pedidos { get; set; }

    public int? sin_usar { get; set; }

    public int? usados { get; set; }

    public int? devueltos { get; set; }

    public int? descuento { get; set; }

    [ForeignKey("id_reserva")]
    [InverseProperty("Detalle")]
    public virtual Orden id_reservaNavigation { get; set; } = null!;

    [ForeignKey("producto")]
    [InverseProperty("Detalle")]
    public virtual Producto productoNavigation { get; set; } = null!;
}
