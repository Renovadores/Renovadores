using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace FicusApp.Models;

public partial class Familia
{
    [Key]
    public int id_familia { get; set; }

    [StringLength(255)]
    public string nombre_familia { get; set; } = null!;

    [InverseProperty("familiaNavigation")]
    public virtual ICollection<Producto> Producto { get; set; } = new List<Producto>();
}
