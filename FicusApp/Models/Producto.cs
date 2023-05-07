using System;
using System.Collections.Generic;

namespace FicusApp.Models
{
    public partial class Producto
    {
        public int SKU { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public string Dimensiones { get; set;}
        public int Peso_recipiente { get; set;}
        public int Peso_desechable { get; set;}
        public int Alquiler_Comercios { get; set;}
        public int Alquiler_Retail { get; set;}
    }
}
