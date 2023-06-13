using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace FicusApp.Models;

public partial class Producto
{
    [Key] public string SKU { get; set; } = null!;
    public string? Nombre { get; set; }
    public int Color { get; set; } = 0;
    public string? Descripcion { get; set; } = null!;
    public string? Dimensiones { get; set; } = null!;
    public int Peso_recipiente { get; set; }
    public int Peso_desechable { get; set; }
    public int Alquiler_Comercios { get; set; } = 0;
    public int Alquiler_Retail { get; set; } = 0;
    public int Categoria { get; set; }
    public int Familia { get; set; }
    public string? Imagen { get; set; }
    public  int Descontinuado { get; set; }
    public int  TotalExistente { get; set; } = 0;
    public int EnUso { get; set; } = 0;
    public int Disponible { get; set; } = 0;
    public int NoDevueltos { get; set; } = 0;
}