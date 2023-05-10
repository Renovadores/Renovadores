using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace FicusApp.Models;

public partial class Producto
{
    [Key] public string SKU { get; set; }

    public string Nombre { get; set; } = null!;
    public string Color { get; set; } = null!;
    public string Descripcion { get; set; } = null!;
    public string Dimensiones { get; set; } = null!;
    public int Peso_recipiente { get; set; }
    public int Peso_desechable { get; set; }
    public int Alquiler_Comercios { get; set; }
    public int Alquiler_Retail { get; set; }
    public int Categoria { get; set; }
    public int Familia { get; set; }
    public string Imagen { get; set; }
}