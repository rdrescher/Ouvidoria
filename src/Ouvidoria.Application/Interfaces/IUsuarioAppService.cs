using System.Collections.Generic;
using System.Threading.Tasks;
using Ouvidoria.Application.DTO;
using Ouvidoria.Application.Utils;
using Ouvidoria.Domain.Models;

namespace Ouvidoria.Application.Interfaces
{
    public interface IUsuarioAppService : IEntityAppService<Usuario, UsuarioDTO>
    {
        Task<Resultado<List<UsuarioDTO>>> GetUsers();
        Task<bool> IsValidUser(CadastroUsuarioDTO cadastroUsuario);
        Task<bool> IsActiveUser(string email);
        Task<Resultado<UsuarioDTO>> Update(CadastroUsuarioDTO cadastroUsuarioDTO);
        Task<Resultado<List<GenericList>>> GetGenericList();
    }
}