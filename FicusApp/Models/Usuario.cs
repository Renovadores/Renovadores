using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace FicusApp.Models;

public partial class Usuario
{
    [Key]
    [Column("ID_Usuario")]
    public int IdUsuario { get; set; }

    [StringLength(255)]
    public string Nombre { get; set; } = null!;

    [StringLength(255)]
    public string Apellidos { get; set; } = null!;

    [StringLength(255)]
    public string Contrasena { get; set; } = null!;

    [Column("ID_Rol")]
    public int? IdRol { get; set; }

    [InverseProperty("ResponsableNavigation")]
    public virtual ICollection<Cliente> Cliente { get; set; } = new List<Cliente>();

    [ForeignKey("IdRol")]
    [InverseProperty("Usuario")]
    public virtual Rol? IdRolNavigation { get; set; }

    [InverseProperty("UsuarioNavigation")]
    public virtual ICollection<Orden> Orden { get; set; } = new List<Orden>();
}
