using System.Collections.Generic;
using System.Threading.Tasks;
using Ouvidoria.Domain.Models;

namespace Ouvidoria.Domain.Interfaces
{
    public interface IRespostaRepository : IEntityRepository<Resposta>
    {
        Task<List<Resposta>> GetAnswersById(int id);
    }
}