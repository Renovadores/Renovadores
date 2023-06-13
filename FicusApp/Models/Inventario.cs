using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FicusApp.Models;

public partial class Inventario
{
    [Key] public int ID_Inventario { get; set; }
    [ForeignKey("ProductoNavigation")]
    public string? Producto { get; set; }

    public int? Cantidad { get; set; }

    public int? Lote { get; set; }

    public DateTime? Fecha_ingreso { get; set; }

    public virtual Producto? ProductoNavigation { get; set; }
}
