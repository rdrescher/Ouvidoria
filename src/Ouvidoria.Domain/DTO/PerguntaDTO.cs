using System.Collections.Generic;
using Ouvidoria.Domain.Enums;

namespace Ouvidoria.Domain.DTO
{
    public class PerguntaDTO
    {
        public string Titulo { get; set; }
        public TipoPergunta TipoPergunta { get; set; }
        public string[] Respostas { get; set; }
        public List<OpcaoDTO> Opcoes { get; set; }
    }
}