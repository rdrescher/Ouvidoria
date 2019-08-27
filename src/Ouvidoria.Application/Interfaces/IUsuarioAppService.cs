using System.Collections.Generic;
using System.Threading.Tasks;
using Ouvidoria.Application.ViewModel;
using Ouvidoria.Application.Utils;
using Ouvidoria.Domain.Models;

namespace Ouvidoria.Application.Interfaces
{
    public interface IUsuarioAppService : IEntityAppService<Usuario, UsuarioViewModel>
    {
        Task<Resultado<List<UsuarioViewModel>>> GetUsers();
        Task<bool> IsValidUser(CadastroUsuarioViewModel cadastroUsuario);
        Task<bool> IsActiveUser(string email);
        Task<Resultado<UsuarioViewModel>> Update(AtualizacaoUsuarioViewModel cadastroUsuarioViewModel);
        Task<Resultado<List<GenericList>>> GetGenericList();
    }
}