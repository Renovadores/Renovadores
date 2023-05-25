using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace FicusApp.Models;

public partial class Inventario
{
    [Key] public int Id_Inventario {get; set;}
    public string? ProductoSKU { get; set; }
    public int Estado { get; set; } = 0;
    public int Cantidad { get; set; }
    public int Lote { get; set; }
    public DateTime Fecha_ingreso { get; set; }
}