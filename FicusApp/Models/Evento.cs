using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace FicusApp.Models;

public partial class Evento
{
    [Key]
    public int EventoId { get; set; }

    [StringLength(255)]
    public string NombreEvento { get; set; } = null!;

    [StringLength(255)]
    public string? DescripcionEvento { get; set; }

    [InverseProperty("Evento")]
    public virtual ICollection<Orden> Orden { get; set; } = new List<Orden>();
}
