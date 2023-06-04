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
    public string id_medio { get; set; } = null!;

    [StringLength(255)]
    public string? caracteristicas { get; set; }

    [ForeignKey("medio")]
    [InverseProperty("medio")]
    public virtual ICollection<Cliente> cliente { get; set; } = new List<Cliente>();
}
