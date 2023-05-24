using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace FicusApp.Models;

public partial class Categoria
{
    [Key]
    [Column("ID_Categoria")]
    public int IdCategoria { get; set; }

    [Column("Nombre_categoria")]
    [StringLength(255)]
    public string NombreCategoria { get; set; } = null!;

    [InverseProperty("CategoriaNavigation")]
    public virtual ICollection<Producto> Producto { get; set; } = new List<Producto>();
}
