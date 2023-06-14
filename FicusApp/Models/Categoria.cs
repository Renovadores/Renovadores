using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace FicusApp.Models;

public partial class Categoria
{
    [Key]
    public int CategoriaId { get; set; }

    [StringLength(255)]
    public string NombreCategoria { get; set; } = null!;

    [InverseProperty("Categoria")]
    public virtual ICollection<Producto> Producto { get; set; } = new List<Producto>();
}
