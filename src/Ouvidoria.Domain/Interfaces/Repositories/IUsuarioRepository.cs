using System.Collections.Generic;
using System.Threading.Tasks;
using Ouvidoria.Domain.Models;

namespace Ouvidoria.Domain.Interfaces
{
    public interface IUsuarioRepository : IEntityRepository<Usuario>
    {
         Task<List<Usuario>> GetAllWithClass();
        Task<string> GetPassword(int id);
    }
}