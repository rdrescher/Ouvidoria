using System.Collections.Generic;
using System.Threading.Tasks;
using Ouvidoria.Domain.Models;

namespace Ouvidoria.Domain.Interfaces
{
    public interface IQuestionarioRepository : IEntityRepository<Questionario>
    {
        Task<List<Questionario>> GetAllInfos();
        Task<List<Questionario>> GetPreviewList(int userId);
        Task<Questionario> GetByIdWithQuestions(int idQuestionario);
    }
}