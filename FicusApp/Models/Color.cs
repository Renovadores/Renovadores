using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace FicusApp.Models;

public partial class Color
{
    [Key]
    public int id_color { get; set; }

    [StringLength(255)]
    public string? descripcion { get; set; }

    [InverseProperty("colorNavigation")]
    public virtual ICollection<Producto> Producto { get; set; } = new List<Producto>();
}
