using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace FicusApp.Models;

public partial class MedioComunicacion
{
    [Key]
    [StringLength(255)]
    public string MedioId { get; set; } = null!;

    [StringLength(255)]
    public string? Caracteristicas { get; set; }

    [ForeignKey("MedioId")]
    [InverseProperty("Medio")]
    public virtual ICollection<Cliente> Cliente { get; set; } = new List<Cliente>();
}
