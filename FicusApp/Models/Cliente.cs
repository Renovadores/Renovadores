using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace FicusApp.Models;

public partial class Cliente
{
    [Key]
    [Column("ID_Cliente")]
    public int IdCliente { get; set; }

    [Column("Fecha_agregado", TypeName = "date")]
    public DateTime? FechaAgregado { get; set; }

    public int? Responsable { get; set; }

    [StringLength(255)]
    public string? Prioridad { get; set; }

    [StringLength(255)]
    public string? Estado { get; set; }

    [Column("Nombre_empresa")]
    [StringLength(255)]
    public string? NombreEmpresa { get; set; }

    [StringLength(255)]
    public string? Contacto { get; set; }

    public int? Telefono { get; set; }

    [StringLength(255)]
    public string? Correo { get; set; }

    [StringLength(255)]
    public string? Web { get; set; }

    [InverseProperty("ClienteNavigation")]
    public virtual ICollection<Orden> Orden { get; set; } = new List<Orden>();

    [ForeignKey("Responsable")]
    [InverseProperty("Cliente")]
    public virtual Usuario? ResponsableNavigation { get; set; }
}
