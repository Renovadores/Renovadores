using System;
using System.Collections.Generic;

namespace FicusApp.Models;

public partial class Evento
{
    public int ID_Evento { get; set; }

    public string Nombre_evento { get; set; } = null!;

    public string? Descripcion_evento { get; set; }

    public string? Orden { get; set; }

    public virtual Orden? OrdenNavigation { get; set; }
}
