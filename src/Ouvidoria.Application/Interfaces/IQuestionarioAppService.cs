using System.Collections.Generic;
using System.Threading.Tasks;
using Ouvidoria.Application.Utils;
using Ouvidoria.Application.ViewModel;
using Ouvidoria.Domain.Models;

namespace Ouvidoria.Application.Interfaces
{
    public interface IQuestionarioAppService : IEntityAppService<Questionario, QuestionarioViewModel>
    {
        Task<Resultado<List<QuestionarioDetailViewModel>>> GetQuizzes();
        Task<Resultado> Create(CadastroQuestionarioViewModel questionario, int userId);
        Task<Resultado<List<QuestionarioPreviewViewModel>>> GetPreviewList(int userId);
    }
}