using System;
using System.Collections.Generic;

namespace Ouvidoria.Application.ViewModel
{
    public class QuestionarioViewModel : EntityViewModel
    {
        public string titulo { get; set; }
        public string descricao { get; set; }
        public DateTime dataInicio { get; set; }
        public DateTime dataFim { get; set; }
        public int idUsuarioCriador { get; set; }
        public List<PerguntaViewModel> pergunta { get; set; }
    }
}