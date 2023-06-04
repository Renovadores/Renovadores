using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace FicusApp.Models;

[PrimaryKey("orden", "fase")]
public partial class Historial_Orden
{
    [Key]
    [StringLength(255)]
    public string orden { get; set; } = null!;

    [Key]
    public int fase { get; set; }

    [Column(TypeName = "date")]
    public DateTime inicio { get; set; }

    [Column(TypeName = "date")]
    public DateTime final { get; set; }

    [ForeignKey("fase")]
    [InverseProperty("Historial_Orden")]
    public virtual Fase faseNavigation { get; set; } = null!;

    [ForeignKey("orden")]
    [InverseProperty("Historial_Orden")]
    public virtual Orden ordenNavigation { get; set; } = null!;
}
