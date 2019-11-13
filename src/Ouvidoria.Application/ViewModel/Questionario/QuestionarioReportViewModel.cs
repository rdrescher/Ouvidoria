using System.Collections.Generic;

namespace Ouvidoria.Application.ViewModel
{
    public class QuestionarioReportViewModel : EntityViewModel
    {
        public string titulo { get; set; }
        public string descricao { get; set; }
        public List<PerguntaReportViewModel> perguntas { get; set; }
    }
}