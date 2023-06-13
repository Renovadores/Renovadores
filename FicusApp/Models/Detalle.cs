using System;
using System.Collections.Generic;

namespace FicusApp.Models;

public partial class Detalle
{
    public string ID_reserva { get; set; } = null!;

    public string? Producto { get; set; }

    public int? Pedidos { get; set; }

    public int? Sin_usar { get; set; }

    public int? Usados { get; set; }

    public int? Devueltos { get; set; }

    public int? Descuento { get; set; }

    public virtual Orden ID_reservaNavigation { get; set; } = null!;

    public virtual Producto? ProductoNavigation { get; set; }
}
