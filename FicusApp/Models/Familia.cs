using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace FicusApp.Models;

public partial class Familia
{
    [Key]
    public int FamiliaId { get; set; }

    [StringLength(255)]
    public string NombreFamilia { get; set; } = null!;

    [InverseProperty("Familia")]
    public virtual ICollection<Producto> Producto { get; set; } = new List<Producto>();
}
