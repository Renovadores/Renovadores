using System;
using System.Collections.Generic;

namespace FicusApp.Models;

public partial class Cliente_Segmento
{
    public int Cliente { get; set; }

    public string Segmento { get; set; } = null!;

    public virtual Cliente ClienteNavigation { get; set; } = null!;

    public virtual Segmento SegmentoNavigation { get; set; } = null!;
}
