using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace FicusApp.Models;

public partial class Evento
{
    [Key]
    [Column("ID_Evento")]
    public int IdEvento { get; set; }

    [Column("Nombre_evento")]
    [StringLength(255)]
    public string NombreEvento { get; set; } = null!;

    [Column("Descripcion_evento")]
    [StringLength(255)]
    public string? DescripcionEvento { get; set; }

    [StringLength(255)]
    public string? Orden { get; set; }

    [ForeignKey("Orden")]
    [InverseProperty("Evento")]
    public virtual Orden? OrdenNavigation { get; set; }
}
