using System.Collections.Generic;
using System.Threading.Tasks;
using Ouvidoria.Domain.DTO;
using Ouvidoria.Domain.Models;

namespace Ouvidoria.Domain.Interfaces
{
    public interface IUsuarioRepository : IEntityRepository<Usuario>
    {
         Task<List<UsuarioDTO>> GetAllWithClass();
         Task<(string email, string cpf)> GetEmailCPF(int id);
    }
}