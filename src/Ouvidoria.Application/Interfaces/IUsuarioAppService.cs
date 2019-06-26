using System.Collections.Generic;
using System.Threading.Tasks;
using Ouvidoria.Application.DTOs;
using Ouvidoria.Application.Utils;
using Ouvidoria.Domain.Models;

namespace Ouvidoria.Application.Interfaces
{
    public interface IUsuarioAppService : IEntityAppService<Usuario, UsuarioDTO>
    {
        Task<Resultado<List<UsuarioDTO>>> GetUsers();
    }
}