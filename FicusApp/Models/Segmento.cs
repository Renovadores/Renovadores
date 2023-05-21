using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace FicusApp.Models;

public partial class Segmento
{
    [Key]
    [Column("ID_Segmento")]
    [StringLength(255)]
    public string IdSegmento { get; set; } = null!;

    [StringLength(255)]
    public string? Detalles { get; set; }
}
