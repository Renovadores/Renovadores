using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace FicusApp.Models;

public partial class Estado
{
    [Key]
    public int id_estado { get; set; }

    [StringLength(255)]
    public string descripcion_estadoproducto { get; set; } = null!;

    [InverseProperty("estadoNavigation")]
    public virtual ICollection<Inventario> Inventario { get; set; } = new List<Inventario>();
}
