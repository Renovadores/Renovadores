using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace FicusApp.Models;

public partial class Cliente
{
    [Key]
    public int ClienteId { get; set; }

    [Column(TypeName = "date")]
    public DateTime? FechaAgregado { get; set; }

    public int? ResponsableId { get; set; }

    [StringLength(255)]
    public string? Prioridad { get; set; }

    [StringLength(255)]
    public string? Estado { get; set; }

    [StringLength(255)]
    public string? NombreEmpresa { get; set; }

    [StringLength(255)]
    public string? Contacto { get; set; }

    public int? Telefono { get; set; }

    [StringLength(255)]
    public string? Correo { get; set; }

    [StringLength(255)]
    public string? Web { get; set; }

    [InverseProperty("Cliente")]
    public virtual ICollection<Orden> Orden { get; set; } = new List<Orden>();

    [ForeignKey("ResponsableId")]
    [InverseProperty("Cliente")]
    public virtual Usuario? Responsable { get; set; }

    [ForeignKey("ClienteId")]
    [InverseProperty("Cliente")]
    public virtual ICollection<MedioComunicacion> Medio { get; set; } = new List<MedioComunicacion>();

    [ForeignKey("ClienteId")]
    [InverseProperty("Cliente")]
    public virtual ICollection<Segmento> Segmento { get; set; } = new List<Segmento>();
}
