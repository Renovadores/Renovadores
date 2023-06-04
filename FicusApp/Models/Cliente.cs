using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace FicusApp.Models;

public partial class Cliente
{
    [Key]
    public int id_cliente { get; set; }

    [Column(TypeName = "date")]
    public DateTime? fecha_agregado { get; set; }

    public int? responsable { get; set; }

    [StringLength(255)]
    public string? prioridad { get; set; }

    [StringLength(255)]
    public string? estado { get; set; }

    [StringLength(255)]
    public string? nombre_empresa { get; set; }

    [StringLength(255)]
    public string? contacto { get; set; }

    public int? telefono { get; set; }

    [StringLength(255)]
    public string? correo { get; set; }

    [StringLength(255)]
    public string? web { get; set; }

    [InverseProperty("clienteNavigation")]
    public virtual ICollection<Orden> Orden { get; set; } = new List<Orden>();

    [ForeignKey("responsable")]
    [InverseProperty("Cliente")]
    public virtual Usuario? responsableNavigation { get; set; }

    [ForeignKey("cliente")]
    [InverseProperty("cliente")]
    public virtual ICollection<MedioComunicacion> medio { get; set; } = new List<MedioComunicacion>();

    [ForeignKey("cliente")]
    [InverseProperty("cliente")]
    public virtual ICollection<Segmento> segmento { get; set; } = new List<Segmento>();
}
