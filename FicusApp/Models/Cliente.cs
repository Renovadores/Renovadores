using System;
using System.Collections.Generic;

namespace FicusApp.Models;

public partial class Cliente
{
    public int ID_Cliente { get; set; }

    public DateTime? Fecha_agregado { get; set; }

    public int? Responsable { get; set; }

    public string? Prioridad { get; set; }

    public string? Estado { get; set; }

    public string? Nombre_empresa { get; set; }

    public string? Contacto { get; set; }

    public DateTime Fecha_Agregado { get; set; }

    public int Responsable { get; set; } = 0;

    public string Prioridad { get; set; } = null!;

    public string Estado { get; set; } = null!;

    public string Nombre_Empresa { get; set; } = null!;

    public string Contacto { get; set; } = null!;

    public int? Telefono { get; set; } = 0;

    public string Correo { get; set; } = null!;

    public string Web { get; set; } = null!;
}