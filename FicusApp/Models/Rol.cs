using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace FicusApp.Models;

public partial class Rol
{
    [Key]
    public int id_rol { get; set; }

    [StringLength(255)]
    public string tipo_rol { get; set; } = null!;

    [StringLength(255)]
    public string? detalles_rol { get; set; }

    [InverseProperty("id_rolNavigation")]
    public virtual ICollection<Usuario> Usuario { get; set; } = new List<Usuario>();
}
