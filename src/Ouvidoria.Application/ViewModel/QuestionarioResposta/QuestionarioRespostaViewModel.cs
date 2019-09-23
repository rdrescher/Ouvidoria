using System;

namespace Ouvidoria.Application.ViewModel
{
    public class QuestionarioRespostaViewModel : EntityViewModel
    {
        public string usuario { get; set; }
        public DateTime dataInsercao { get; set; }
    }
}