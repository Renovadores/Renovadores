﻿using System;
using System.Collections.Generic;

namespace FicusApp.Models;

public partial class UsuarioA
{
    public int IdUsuario { get; set; }

    public string NombreUsuario { get; set; }

    public string Clave { get; set; }

    public virtual ICollection<HistorialRefreshToken> HistorialRefreshTokens { get; } = new List<HistorialRefreshToken>();
}
