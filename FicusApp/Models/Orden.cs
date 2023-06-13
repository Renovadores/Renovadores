using System;
using System.Collections.Generic;

namespace FicusApp.Models;

public partial class Orden
{
    public string ID_Orden { get; set; } = null!;

    public DateTime Fecha_alquiler { get; set; }

    public int Usuario { get; set; }

    public int Cliente { get; set; }

    public int? Registro_limpieza { get; set; }

    public int? Limpieza_unidad { get; set; }

    public int? Limpieza { get; set; }

    public int Monto { get; set; }

    public int? Descuento { get; set; }

    public virtual Cliente ClienteNavigation { get; set; } = null!;

    public virtual Detalle? Detalle { get; set; }

    public virtual ICollection<Evento> Evento { get; set; } = new List<Evento>();

    public virtual Usuario UsuarioNavigation { get; set; } = null!;
}
