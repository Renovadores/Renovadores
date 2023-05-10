using System;
using System.Collections.Generic;

namespace FicusApp.Models;

public partial class Color
{
    public int ID_Color { get; set; }

    public string? Descripcion { get; set; }

    public virtual ICollection<Producto> Productos { get; set; } = new List<Producto>();
}
