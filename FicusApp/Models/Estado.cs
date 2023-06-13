using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace FicusApp.Models;

public partial class Estado
{
    [Key]
    public int EstadoId { get; set; }

    [StringLength(255)]
    public string DescripcionEstadoProducto { get; set; } = null!;
}
