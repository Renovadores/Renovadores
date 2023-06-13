using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace FicusApp.Models;

public partial class Orden
{
    [Key]
    public int OrdenId { get; set; }

    [Column(TypeName = "date")]
    public DateTime FechaAlquiler { get; set; }

    public int UsuarioId { get; set; }

    public int ClienteId { get; set; }

    public int? EventoId { get; set; }

    public int? RegistroLimpiezaId { get; set; }

    public int? LimpiezaUnidad { get; set; }

    public int? Limpieza { get; set; }

    public int Monto { get; set; }

    public int? Descuento { get; set; }

    [ForeignKey("ClienteId")]
    [InverseProperty("Orden")]
    public virtual Cliente Cliente { get; set; } = null!;

    [InverseProperty("Orden")]
    public virtual ICollection<Detalle> Detalle { get; set; } = new List<Detalle>();

    [ForeignKey("EventoId")]
    [InverseProperty("Orden")]
    public virtual Evento? Evento { get; set; }

    [InverseProperty("Orden")]
    public virtual ICollection<HistorialOrden> HistorialOrden { get; set; } = new List<HistorialOrden>();

    [ForeignKey("UsuarioId")]
    [InverseProperty("Orden")]
    public virtual Usuario Usuario { get; set; } = null!;
}
