using System.Collections.Generic;

namespace Ouvidoria.Application.ViewModel
{
    public class CadastroQuestionarioRespostaViewModel
    {
        public int idQuestionario { get; set; }
        public List<CadastroRespostaViewModel> Respostas { get; set; }
    }
}