using System;
using System.Collections.Generic;

namespace FicusApp.Models;

public partial class Rol
{
    public int ID_Rol { get; set; }

    public string Tipo_rol { get; set; } = null!;

    public string? Detalles_rol { get; set; }

    public virtual ICollection<Usuario> Usuarios { get; set; } = new List<Usuario>();
}
