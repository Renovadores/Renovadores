using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace FicusApp.Models;

[Table("Cliente_Segmento")]
public partial class ClienteSegmento
{
    public int Cliente { get; set; }

    [Key]
    [StringLength(255)]
    public string Segmento { get; set; } = null!;

    [ForeignKey("Cliente")]
    public virtual Cliente? ClienteNavigation { get; set; } = null!;

    [ForeignKey("Segmento")]
    public virtual Segmento? SegmentoNavigation { get; set; } = null!;
}
