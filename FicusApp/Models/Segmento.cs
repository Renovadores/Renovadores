using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace FicusApp.Models;

public partial class Segmento
{
    [Key]
    [StringLength(255)]
    public string SegmentoId { get; set; } = null!;

    [StringLength(255)]
    public string? Detalles { get; set; }

    [ForeignKey("SegmentoId")]
    [InverseProperty("Segmento")]
    public virtual ICollection<Cliente> Cliente { get; set; } = new List<Cliente>();
}
