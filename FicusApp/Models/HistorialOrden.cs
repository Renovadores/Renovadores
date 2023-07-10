using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace FicusApp.Models;

[PrimaryKey("OrdenId", "FaseId")]
public partial class HistorialOrden
{
    [Key]
    public int OrdenId { get; set; }

    [Key]
    public int FaseId { get; set; }

    public DateTime Inicio { get; set; }

    public DateTime? Final { get; set; }

    [ForeignKey("FaseId")]
    [InverseProperty("HistorialOrden")]
    public virtual Fase? Fase { get; set; }

    [ForeignKey("OrdenId")]
    [InverseProperty("HistorialOrden")]
    public virtual Orden? Orden { get; set; }
}
