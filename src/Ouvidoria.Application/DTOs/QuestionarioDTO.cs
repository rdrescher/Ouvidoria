using System;
using System.Collections.Generic;

namespace Ouvidoria.Application.DTOs
{
    public class QuestionarioDTO
    {
        public string titulo { get; set; }
        public string descricao { get; set; }
        public DateTime dataInicio { get; set; }
        public DateTime dataFim { get; set; }
        public int idUsuarioCriador { get; set; }
        public List<PerguntaDTO> pergunta { get; set; }
    }
}