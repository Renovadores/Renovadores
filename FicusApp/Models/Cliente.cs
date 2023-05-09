using System;
using System.Collections.Generic;

namespace FicusApp.Models;

public partial class Cliente
{
    public int Id { get; set; }

    public string Tipo { get; set; } = null!;

    public DateTime Fecha_Agregado { get; set; }

    public string Responsable { get; set; } = null!;

    public string Prioridad { get; set; } = null!;

    public string Estado { get; set; } = null!;

    public string Nombre { get; set; } = null!;

    public int Telefono { get; set; } = 0;

    public string Correo { get; set; } = null!;

    public string Web { get; set; } = null!;
}
