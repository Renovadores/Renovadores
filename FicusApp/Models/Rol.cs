using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace FicusApp.Models;

public partial class Rol
{
    [Key]
    [Column("ID_Rol")]
    public int IdRol { get; set; }

    [Column("Tipo_rol")]
    [StringLength(255)]
    public string TipoRol { get; set; } = null!;

    [Column("Detalles_rol")]
    [StringLength(255)]
    public string? DetallesRol { get; set; }

    [InverseProperty("IdRolNavigation")]
    public virtual ICollection<Usuario> Usuario { get; set; } = new List<Usuario>();
}
