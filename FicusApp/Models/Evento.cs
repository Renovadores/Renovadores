using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace FicusApp.Models;

public partial class Evento
{
    [Key]
    public int id_evento { get; set; }

    [StringLength(255)]
    public string nombre_evento { get; set; } = null!;

    [StringLength(255)]
    public string? descripcion_evento { get; set; }

    [InverseProperty("eventoNavigation")]
    public virtual ICollection<Orden> Orden { get; set; } = new List<Orden>();
}
