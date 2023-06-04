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
    public string id_segmento { get; set; } = null!;

    [StringLength(255)]
    public string? detalles { get; set; }

    [ForeignKey("segmento")]
    [InverseProperty("segmento")]
    public virtual ICollection<Cliente> cliente { get; set; } = new List<Cliente>();
}
