using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace FicusApp.Models;

public partial class ClienteSegmento
{
    [Key]
    public int ClienteSegmentoId { get; set; }

    public int ClienteId { get; set; }

    [StringLength(255)]
    public string SegmentoId { get; set; } = null!;

    [ForeignKey("ClienteId")]
    [InverseProperty("ClienteSegmento")]
    public virtual Cliente Cliente { get; set; } = null!;

    [ForeignKey("SegmentoId")]
    [InverseProperty("ClienteSegmento")]
    public virtual Segmento Segmento { get; set; } = null!;
}
