using System;

namespace Ouvidoria.Application.ViewModel
{
    public class QuestionarioPreviewViewModel : EntityViewModel
    {
        public string titulo { get; set; }
        public string descricao { get; set; }
        public string dataFim { get; set; }
    }
}