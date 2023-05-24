using System;
using System.Collections.Generic;

namespace FicusApp.Models;

public partial class Historial_Orden
{
    public string Orden { get; set; } = null!;

    public int Fase { get; set; }

    public DateTime Inicio { get; set; }

    public DateTime Final { get; set; }

    public virtual Fase FaseNavigation { get; set; } = null!;

    public virtual Orden OrdenNavigation { get; set; } = null!;
}
