using System;

namespace Ouvidoria.Application.DTO
{
    public class RespostaDTO : EntityDTO
    {
        public string retorno { get; set; }
        public int? idOpcao { get; set; }
        public int idPergunta { get; set; }
    }
}