using System.ComponentModel.DataAnnotations;

namespace FicusApp.Models;

public partial class Producto
{
    [Key] public string SKU { get; set; } = null!;

    public string? Nombre { get; set; }

    public int? Color { get; set; }

    public string? Descripcion { get; set; }

    public string? Dimensiones { get; set; }

    public int? Peso_recipiente { get; set; }

    public int? Peso_desechable { get; set; }

    public int? Alquiler_Comercios { get; set; }

    public int? Alquiler_Retail { get; set; }

    public int? Categoria { get; set; }

    public int? Familia { get; set; }

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
