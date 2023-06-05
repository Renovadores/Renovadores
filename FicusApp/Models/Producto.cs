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

    public int? ColorId { get; set; }

    [StringLength(255)]
    public string? Descripcion { get; set; }

    [StringLength(255)]
    public string? Dimensiones { get; set; }

    public int? PesoRecipiente { get; set; }

    public int? PesoDesechable { get; set; }

    public int? AlquilerComercios { get; set; }

    public int? AlquilerRetail { get; set; }

    public int? CategoriaId { get; set; }

    public int? FamiliaId { get; set; }

    [StringLength(255)]
    public string? Imagen { get; set; }

    [ForeignKey("CategoriaId")]
    [InverseProperty("Producto")]
    public virtual Categoria? Categoria { get; set; }

    [ForeignKey("ColorId")]
    [InverseProperty("Producto")]
    public virtual Color? Color { get; set; }

    [InverseProperty("Producto")]
    public virtual ICollection<Detalle> Detalle { get; set; } = new List<Detalle>();

    [ForeignKey("FamiliaId")]
    [InverseProperty("Producto")]
    public virtual Familia? Familia { get; set; }

    [InverseProperty("Producto")]
    public virtual ICollection<Inventario> Inventario { get; set; } = new List<Inventario>();
}
