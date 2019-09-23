using System.Collections.Generic;
using System.Threading.Tasks;
using Ouvidoria.Application.Utils;
using Ouvidoria.Application.ViewModel;

namespace Ouvidoria.Application.Interfaces
{
    public interface IQuestionarioRespostaAppService
    {
        Task<Resultado> Create(CadastroQuestionarioRespostaViewModel resposta, int idUsuario);
        Task<Resultado> IsUserAbleToAnswer(int idQuestionario, int idUsuario);
        Task<List<QuestionarioRespostaViewModel>> GetAnswersByQuiz(int idQuestionario);
        Task<List<RespostaViewModel>> GetAnswersById(int id);
    }
}