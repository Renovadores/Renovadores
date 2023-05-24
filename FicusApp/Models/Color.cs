using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace FicusApp.Models;

public partial class Color
{
    [Key]
    [Column("ID_Color")]
    public int IdColor { get; set; }

    [StringLength(255)]
    public string? Descripcion { get; set; }

    [InverseProperty("ColorNavigation")]
    public virtual ICollection<Producto> Producto { get; set; } = new List<Producto>();
}
