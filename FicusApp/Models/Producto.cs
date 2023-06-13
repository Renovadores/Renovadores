using System.ComponentModel.DataAnnotations;

namespace FicusApp.Models;

public partial class Producto
{
    [Key] public string ProductoId { get; set; } = null!;
    public string? Nombre { get; set; }

    public int? ColorId { get; set; }

    public string? Descripcion { get; set; }

    public string? Dimensiones { get; set; }

    public int? PesoRecipiente { get; set; }

    public int? PesoDesechable { get; set; }

    public int? AlquilerComercios { get; set; }

    public int? AlquilerRetail { get; set; }

    public int? CategoriaId { get; set; }

    public int? FamiliaId { get; set; }

    public string? Imagen { get; set; }

    public int TotalExistente { get; set; }

    public int EnUso { get; set; }

    public int Disponible { get; set; }

    public int NoDevueltos { get; set; }

    public int Descontinuado { get; set; }

    public virtual Categoria? CategoriaNavigation { get; set; }

    public virtual Color? ColorNavigation { get; set; }

    public virtual ICollection<Detalle> Detalle { get; set; } = new List<Detalle>();

    public virtual Familia? FamiliaNavigation { get; set; }
}
