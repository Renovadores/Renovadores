using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace FicusApp.Models;

[Keyless]
[Table("Historial_Orden")]
public partial class HistorialOrden
{
    [StringLength(255)]
    public string Orden { get; set; } = null!;

    public int Fase { get; set; }

    [Column(TypeName = "date")]
    public DateTime Inicio { get; set; }

    [Column(TypeName = "date")]
    public DateTime Final { get; set; }

    [ForeignKey("Fase")]
    public virtual Fase FaseNavigation { get; set; } = null!;

    [ForeignKey("Orden")]
    public virtual Orden OrdenNavigation { get; set; } = null!;
}
