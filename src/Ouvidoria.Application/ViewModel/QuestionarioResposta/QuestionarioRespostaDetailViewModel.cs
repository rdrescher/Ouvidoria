using System.Collections.Generic;

namespace Ouvidoria.Application.ViewModel
{
    public class QuestionarioRespostaDetailViewModel
    {
        public string titulo { get; set; }
        public string usuario { get; set; }
        public string dataCriacao { get; set; }
        public List<RespostaViewModel> respostas { get; set; }
    }
}