using System;
using System.Collections.Generic;

namespace FicusApp.Models;

public partial class Cliente
{
    public int ID_Cliente { get; set; }

    public DateTime? Fecha_agregado { get; set; }

    public int? Responsable { get; set; }

    public string? Prioridad { get; set; }

    public string? Estado { get; set; }

    public string? Nombre_empresa { get; set; }

    public string? Contacto { get; set; }

    public int? Telefono { get; set; }

    public string? Correo { get; set; }

    public string? Web { get; set; }

    public virtual Usuario? ResponsableNavigation { get; set; }
}
