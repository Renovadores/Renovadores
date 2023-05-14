using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace FicusApp.Models;

public partial class Cliente_Segmento
{
    [Key]
    public int Cliente { get; set; }

    public string Segmento { get; set; } = null!;
}
