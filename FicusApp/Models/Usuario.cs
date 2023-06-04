using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace FicusApp.Models;

public partial class Usuario
{
    [Key]
    public int id_usuario { get; set; }

    [StringLength(255)]
    public string nombre { get; set; } = null!;

    [StringLength(255)]
    public string apellidos { get; set; } = null!;

    [StringLength(255)]
    public string contrasena { get; set; } = null!;

    public int? id_rol { get; set; }

    [InverseProperty("responsableNavigation")]
    public virtual ICollection<Cliente> Cliente { get; set; } = new List<Cliente>();

    [InverseProperty("usuarioNavigation")]
    public virtual ICollection<Orden> Orden { get; set; } = new List<Orden>();

    [ForeignKey("id_rol")]
    [InverseProperty("Usuario")]
    public virtual Rol? id_rolNavigation { get; set; }
}
