using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace FicusApp.Models;

public partial class Fase
{
    [Key]
    public int FaseId { get; set; }

    [StringLength(255)]
    public string DescripcionEstado { get; set; } = null!;

    [InverseProperty("Fase")]
    public virtual ICollection<HistorialOrden> HistorialOrden { get; set; } = new List<HistorialOrden>();

    [InverseProperty("Fase")]
    public virtual ICollection<Orden> Orden { get; set; } = new List<Orden>();
}
