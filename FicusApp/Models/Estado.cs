using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace FicusApp.Models;

public partial class Estado
{
    [Key]
    [Column("ID_Estado")]
    public int IdEstado { get; set; }

    [Column("Descripcion_estadoproducto")]
    [StringLength(255)]
    public string DescripcionEstadoproducto { get; set; } = null!;
}
