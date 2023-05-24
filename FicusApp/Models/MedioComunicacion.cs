using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace FicusApp.Models;

public partial class MedioComunicacion
{
    [Key]
    [Column("ID_Medio")]
    [StringLength(255)]
    public string IdMedio { get; set; } = null!;

    [StringLength(255)]
    public string? Caracteristicas { get; set; }
}
