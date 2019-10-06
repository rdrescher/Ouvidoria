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
        Task<Resultado<List<QuestionarioRespostaViewModel>>> GetAnswersByQuiz(int idQuestionario);
        Task<Resultado<QuestionarioRespostaDetailViewModel>> GetAnswersById(int id);
    }
}