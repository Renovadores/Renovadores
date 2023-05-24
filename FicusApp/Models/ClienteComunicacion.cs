using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace FicusApp.Models;

[Table("Cliente_Comunicacion")]
public partial class ClienteComunicacion
{
    public int? Cliente { get; set; }

    [Key]
    [StringLength(255)]
    public string? Medio { get; set; }

    [ForeignKey("Cliente")]
    public virtual Cliente? ClienteNavigation { get; set; }

    [ForeignKey("Medio")]
    public virtual MedioComunicacion? MedioNavigation { get; set; }
}
