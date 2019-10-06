using Ouvidoria.Application.Utils;
using Ouvidoria.Application.ViewModel;
using Ouvidoria.Domain.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Ouvidoria.Application.Interfaces
{
    public interface IUsuarioAppService : IEntityAppService<Usuario, UsuarioViewModel>
    {
        Task<Resultado<List<UsuarioViewModel>>> GetUsers();
        Task<bool> IsValidUser(CadastroUsuarioViewModel cadastroUsuario);
        Task<bool> IsActiveUser(string email);
        Task<Resultado<UsuarioViewModel>> Update(AtualizacaoUsuarioViewModel atualizacaoUsuario);
        Task<Resultado<List<GenericList>>> GetGenericList();
    }
}