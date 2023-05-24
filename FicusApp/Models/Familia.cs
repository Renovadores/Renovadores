using System;
using System.Collections.Generic;

namespace FicusApp.Models;

public partial class Familia
{
    public int ID_Familia { get; set; }

    public string Nombre_familia { get; set; } = null!;

    public virtual ICollection<Producto> Producto { get; set; } = new List<Producto>();
}
