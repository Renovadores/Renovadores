using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace FicusApp.Models;

public partial class Cliente_Segmento
{
    public int Cliente { get; set; }
    [Key]
    public string Segmento { get; set; } = null!;
}
