using System;
using System.Collections.Generic;

namespace FicusApp.Models;

public partial class Usuario
{
    public int ID_Usuario { get; set; }

    public string Nombre { get; set; } = null!;

    public string Apellidos { get; set; } = null!;

    public string Contrasena { get; set; } = null!;

    public int? ID_Rol { get; set; }

    public virtual ICollection<Cliente> Cliente { get; set; } = new List<Cliente>();

    public virtual Rol? ID_RolNavigation { get; set; }

    public virtual ICollection<Orden> Orden { get; set; } = new List<Orden>();
}
