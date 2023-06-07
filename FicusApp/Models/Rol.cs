using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace FicusApp.Models;

public partial class Rol
{
    [Key]
    public int RolId { get; set; }

    [StringLength(255)]
    public string TipoRol { get; set; } = null!;

    [StringLength(255)]
    public string? DetallesRol { get; set; }

    [InverseProperty("Rol")]
    public virtual ICollection<Usuario> Usuario { get; set; } = new List<Usuario>();
}
