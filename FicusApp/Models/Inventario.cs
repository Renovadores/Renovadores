﻿using System;
using System.Collections.Generic;

namespace FicusApp.Models;

public partial class Inventario
{
    public string? Producto { get; set; }

    public int? Estado { get; set; }

    public int? Cantidad { get; set; }

    public int? Lote { get; set; }

    public DateTime? Fecha_ingreso { get; set; }

    public virtual Estado? EstadoNavigation { get; set; }

    public virtual Producto? ProductoNavigation { get; set; }
}