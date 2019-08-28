using System;
using System.Collections.Generic;

namespace Ouvidoria.Application.ViewModel
{
    public class QuestionarioDetailViewModel : EntityViewModel
    {
        public string titulo { get; set; }
        public string descricao { get; set; }
        public DateTime dataInicio { get; set; }
        public DateTime dataFim { get; set; }
        public string usuarioCriador { get; set; }
        public int perguntas { get; set; }
        public int respostas { get; set; }
    }
}