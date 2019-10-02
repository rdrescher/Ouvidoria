using System.Threading.Tasks;
using Ouvidoria.Domain.Models;

namespace Ouvidoria.Domain.Interfaces
{
    public interface IInteracaoRepository : IEntityRepository<Interacao>
    {
        Task<Interacao> GetWithUser(int id);
    }
}