using System;
using System.Collections.Generic;

namespace Ouvidoria.Application.ViewModel
{
    public class QuestionarioViewModel : EntityViewModel
    {
        public string titulo { get; set; }
        public string descricao { get; set; }
        public List<PerguntaViewModel> perguntas { get; set; }
    }
}