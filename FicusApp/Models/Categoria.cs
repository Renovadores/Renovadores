using System;
using System.Collections.Generic;

namespace FicusApp.Models;

public partial class Categoria
{
    public int ID_Categoria { get; set; }

    public string Nombre_categoria { get; set; } = null!;

    public virtual ICollection<Producto> Producto { get; set; } = new List<Producto>();
}
