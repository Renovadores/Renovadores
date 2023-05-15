using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace FicusApp.Models;

public partial class Cliente_Comunicacion
{
    public int Cliente { get; set; }
    [Key]
    public string Medio { get; set; } = null!;
}