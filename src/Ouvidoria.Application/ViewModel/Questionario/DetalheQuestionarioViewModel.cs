using System;
using System.Collections.Generic;

namespace Ouvidoria.Application.ViewModel
{
    public class DetalheQuestionarioViewModel : EntityViewModel
    {
        public string titulo { get; set; }
        public string descricao { get; set; }
        public string dataInicio { get; set; }
        public string dataFim { get; set; }
        public string usuarioCriador { get; set; }
        public int perguntas { get; set; }
        public int respostas { get; set; }
    }
}