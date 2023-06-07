using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace FicusApp.Models;

public partial class Usuario
{
    [Key]
    public int UsuarioId { get; set; }

    [StringLength(255)]
    public string Nombre { get; set; } = null!;

    [StringLength(255)]
    public string Apellidos { get; set; } = null!;

    [StringLength(255)]
    public string Contrasena { get; set; } = null!;

    public int? RolId { get; set; }

    [InverseProperty("Responsable")]
    public virtual ICollection<Cliente> Cliente { get; set; } = new List<Cliente>();

    [InverseProperty("Usuario")]
    public virtual ICollection<Orden> Orden { get; set; } = new List<Orden>();

    [ForeignKey("RolId")]
    [InverseProperty("Usuario")]
    public virtual Rol? Rol { get; set; }
}
