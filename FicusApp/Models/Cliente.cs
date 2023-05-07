using System;
using System.Collections.Generic;

namespace FicusApp.Models;

public partial class Cliente
{
    public int Id { get; set; }

    public string Empresa { get; set; } = null!;

    public DateTime Agregado { get; set; }

    public string Responsable { get; set; } = null!;

    public string Prioridad { get; set; } = null!;
}
