using System;
using System.Collections.Generic;

namespace FicusApp.Models;

public partial class Categorium
{
    public int ID_Categoria { get; set; }

    public string Nombre_categoria { get; set; } = null!;

    public virtual ICollection<Producto> Productos { get; set; } = new List<Producto>();
}
