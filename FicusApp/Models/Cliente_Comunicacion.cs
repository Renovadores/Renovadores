using System;
using System.Collections.Generic;

namespace FicusApp.Models;

public partial class Cliente_Comunicacion
{
    public int? Cliente { get; set; }

    public string? Medio { get; set; }

    public virtual Cliente? ClienteNavigation { get; set; }

    public virtual MedioComunicacion? MedioNavigation { get; set; }
}
