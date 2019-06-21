using System.Collections.Generic;
using Ouvidoria.Domain.Enums;

namespace Ouvidoria.Application.DTOs
{
    public class PerguntaDTO : EntityDTO
    {
        public string descricao { get; set; }
        public TipoPergunta tipo { get; set; }
        public List<OpcaoDTO> opcoes { get; set; }
    }
}