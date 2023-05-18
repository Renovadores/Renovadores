using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace FicusApp.Models;

public partial class Usuario
{
    [Key]
    public int ID_Usuario { get; set; }
    public string Nombre { get; set; } = null!;
    public string Apellidos { get; set; } = null!;
    public string Contrasena { get; set; } = null!;
    public int ID_Rol { get; set; } = 0;
}
