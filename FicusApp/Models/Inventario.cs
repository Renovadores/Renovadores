using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace FicusApp.Models;

[PrimaryKey("producto", "estado")]
public partial class Inventario
{
    [Key]
    [StringLength(255)]
    public string producto { get; set; } = null!;

    [Key]
    public int estado { get; set; }

    public int? cantidad { get; set; }

    public int? lote { get; set; }

    [Column(TypeName = "date")]
    public DateTime? fecha_ingreso { get; set; }

    [ForeignKey("estado")]
    [InverseProperty("Inventario")]
    public virtual Estado estadoNavigation { get; set; } = null!;

    [ForeignKey("producto")]
    [InverseProperty("Inventario")]
    public virtual Producto productoNavigation { get; set; } = null!;
}
