using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace FicusApp.Models;

public partial class Detalle
{
    [Key]
    [Column("ID_reserva")]
    [StringLength(255)]
    public string IdReserva { get; set; } = null!;

    [StringLength(255)]
    public string? Producto { get; set; }

    public int? Pedidos { get; set; }

    [Column("Sin_usar")]
    public int? SinUsar { get; set; }

    public int? Usados { get; set; }

    public int? Devueltos { get; set; }

    public int? Descuento { get; set; }

    [ForeignKey("IdReserva")]
    [InverseProperty("Detalle")]
    public virtual Orden? IdReservaNavigation { get; set; } = null!;

    [ForeignKey("Producto")]
    [InverseProperty("Detalle")]
    public virtual Producto? ProductoNavigation { get; set; }
}
