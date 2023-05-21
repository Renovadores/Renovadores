using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace FicusApp.Models;

public partial class Orden
{
    [Key]
    [Column("ID_Orden")]
    [StringLength(255)]
    public string IdOrden { get; set; } = null!;

    [Column("Fecha_alquiler", TypeName = "date")]
    public DateTime FechaAlquiler { get; set; }

    public int Usuario { get; set; }

    public int Cliente { get; set; }

    [Column("Registro_limpieza")]
    public int? RegistroLimpieza { get; set; }

    [Column("Limpieza_unidad")]
    public int? LimpiezaUnidad { get; set; }

    public int? Limpieza { get; set; }

    public int Monto { get; set; }

    public int? Descuento { get; set; }

    [ForeignKey("Cliente")]
    [InverseProperty("Orden")]
    public virtual Cliente ClienteNavigation { get; set; } = null!;

    [InverseProperty("IdReservaNavigation")]
    public virtual Detalle? Detalle { get; set; }

    [InverseProperty("OrdenNavigation")]
    public virtual ICollection<Evento> Evento { get; set; } = new List<Evento>();

    [ForeignKey("Usuario")]
    [InverseProperty("Orden")]
    public virtual Usuario UsuarioNavigation { get; set; } = null!;
}
