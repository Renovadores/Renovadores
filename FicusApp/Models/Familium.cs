using System;
using System.Collections.Generic;

namespace FicusApp.Models;

public partial class Familium
{
    public int ID_Familia { get; set; }

    public string Nombre_familia { get; set; } = null!;

    public virtual ICollection<Producto> Productos { get; set; } = new List<Producto>();
}
