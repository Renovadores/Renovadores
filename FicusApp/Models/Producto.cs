using System;
using System.Collections.Generic;

namespace FicusApp.Models;

public partial class Producto
{
    public int ProductoID { get; set; }

    public string Nombre { get; set; } = null!;

    public string Descripcion { get; set; } = null!;
}