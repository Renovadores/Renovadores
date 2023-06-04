using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace FicusApp.Models;

public partial class Fase
{
    [Key]
    public int id_fase { get; set; }

    [StringLength(255)]
    public string descripcion_estado { get; set; } = null!;

    [InverseProperty("faseNavigation")]
    public virtual ICollection<Historial_Orden> Historial_Orden { get; set; } = new List<Historial_Orden>();
}
