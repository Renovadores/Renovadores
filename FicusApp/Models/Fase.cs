using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace FicusApp.Models;

public partial class Fase
{
    [Key]
    [Column("ID_Fase")]
    public int IdFase { get; set; }

    [Column("Descripcion_estado")]
    [StringLength(255)]
    public string DescripcionEstado { get; set; } = null!;
}
