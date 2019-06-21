using System;

namespace Ouvidoria.Application.DTOs
{
    public class RespostaDTO
    {
        public string retorno { get; set; }
        public int? idOpcao { get; set; }
        public int idPergunta { get; set; }
    }
}