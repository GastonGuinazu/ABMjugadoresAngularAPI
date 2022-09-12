using System;
using System.Collections.Generic;

namespace Api.Data
{
    public partial class Jugadores
    {
        public int Id { get; set; }
        public string? Nombre { get; set; }
        public string? Posicion { get; set; }
        public int? Dorsal { get; set; }
    }
}
