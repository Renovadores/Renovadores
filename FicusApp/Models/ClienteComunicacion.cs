using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace FicusApp.Models;

public partial class ClienteComunicacion
{
    [Key]
    public int ClienteComunicacionId { get; set; }

    public int? ClienteId { get; set; }

    [StringLength(255)]
    public string? MedioId { get; set; }

    [ForeignKey("ClienteId")]
    [InverseProperty("ClienteComunicacion")]
    public virtual Cliente? Cliente { get; set; }

    [ForeignKey("MedioId")]
    [InverseProperty("ClienteComunicacion")]
    public virtual MedioComunicacion? Medio { get; set; }
}
