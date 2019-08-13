using System;
using System.Collections.Generic;

namespace Ouvidoria.Application.DTO
{
    public class QuestionarioDTO : EntityDTO
    {
        public string titulo { get; set; }
        public string descricao { get; set; }
        public DateTime dataInicio { get; set; }
        public DateTime dataFim { get; set; }
        public int idUsuarioCriador { get; set; }
        public List<PerguntaDTO> pergunta { get; set; }
    }
}