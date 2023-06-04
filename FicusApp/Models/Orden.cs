using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace FicusApp.Models;

public partial class Orden
{
    [Key]
    [StringLength(255)]
    public string id_orden { get; set; } = null!;

    [Column(TypeName = "date")]
    public DateTime fecha_alquiler { get; set; }

    public int usuario { get; set; }

    public int cliente { get; set; }

    public int? evento { get; set; }

    public int? registro_limpieza { get; set; }

    public int? limpieza_unidad { get; set; }

    public int? limpieza { get; set; }

    public int monto { get; set; }

    public int? descuento { get; set; }

    [InverseProperty("id_reservaNavigation")]
    public virtual ICollection<Detalle> Detalle { get; set; } = new List<Detalle>();

    [InverseProperty("ordenNavigation")]
    public virtual ICollection<Historial_Orden> Historial_Orden { get; set; } = new List<Historial_Orden>();

    [ForeignKey("cliente")]
    [InverseProperty("Orden")]
    public virtual Cliente clienteNavigation { get; set; } = null!;

    [ForeignKey("evento")]
    [InverseProperty("Orden")]
    public virtual Evento? eventoNavigation { get; set; }

    [ForeignKey("usuario")]
    [InverseProperty("Orden")]
    public virtual Usuario usuarioNavigation { get; set; } = null!;
}
