using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace FicusApp.Models;

public partial class Producto
{
    [Key]
    [StringLength(255)]
    public string ProductoId { get; set; } = null!;

    [StringLength(255)]
    public string? Nombre { get; set; }
    [ForeignKey("Color")]
    public int ColorId { get; set; }

    [StringLength(255)]
    public string? Descripcion { get; set; }

    [StringLength(255)]
    public string? Dimensiones { get; set; }

    public int? PesoRecipiente { get; set; }

    public int? PesoDesechable { get; set; }

    public int? AlquilerComercios { get; set; }

    public int? AlquilerRetail { get; set; }
    [ForeignKey("Categoria")]
    public int CategoriaId { get; set; }
    [ForeignKey("Familia")]
    public int FamiliaId { get; set; }

    [StringLength(255)]
    public string? Imagen { get; set; }

    public int? Descontinuado { get; set; } = 0;

    public int? TotalExistente { get; set; }

    public int? EnUso { get; set; }

    public int? Disponible { get; set; }

    public int? NoDevueltos { get; set; }

    public Categoria Categoria { get; set; } = null!;

    public Color Color { get; set; } = null!;

    [InverseProperty("Producto")]
    public virtual ICollection<Detalle> Detalle { get; set; } = new List<Detalle>();

    public Familia Familia { get; set; } = null!;
}
