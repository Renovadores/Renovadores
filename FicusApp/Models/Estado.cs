using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace FicusApp.Models;

public partial class Estado
{
    [Key]
    public int ID_Estado { get; set; }

    public string Descripcion_estadoproducto { get; set; } = null!;
}
