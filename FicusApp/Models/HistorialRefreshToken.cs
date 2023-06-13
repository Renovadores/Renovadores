using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace FicusApp.Models;

public partial class HistorialRefreshToken
{
    [Key]
    public int IdHistorialToken { get; set; }

    public int? UsuarioId { get; set; }

    [StringLength(500)]
    [Unicode(false)]
    public string? Token { get; set; }

    [StringLength(200)]
    [Unicode(false)]
    public string? RefreshToken { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? FechaCreacion { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? FechaExpiracion { get; set; }

    public bool? EsActivo { get; set; }

    [ForeignKey("UsuarioId")]
    [InverseProperty("HistorialRefreshToken")]
    public virtual Usuario? Usuario { get; set; }
}
