using System.Collections.Generic;
using System.Threading.Tasks;
using Ouvidoria.Domain.Models;

namespace Ouvidoria.Domain.Interfaces
{
    public interface IQuestionarioRespostaRepository : IEntityRepository<QuestionarioResposta>
    {
        Task<List<QuestionarioResposta>> GetAnsersByQuiz(int idQuestionario);
        Task<QuestionarioResposta> GetByIdWithIncludes(int id);
    }
}