using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace FicusApp.Models;

public partial class Familia
{
    [Key]
    [Column("ID_Familia")]
    public int IdFamilia { get; set; }

    [Column("Nombre_familia")]
    [StringLength(255)]
    public string NombreFamilia { get; set; } = null!;

    [InverseProperty("FamiliaNavigation")]
    public virtual ICollection<Producto> Producto { get; set; } = new List<Producto>();
}
