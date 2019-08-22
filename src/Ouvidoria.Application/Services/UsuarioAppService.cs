using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Ouvidoria.Application.DTO;
using Ouvidoria.Application.Interfaces;
using Ouvidoria.Application.Utils;
using Ouvidoria.Domain.Interfaces;
using Ouvidoria.Domain.Models;
using Ouvidoria.Services.Interfaces;

namespace Ouvidoria.Application.Services
{
    public class UsuarioAppService : EntityAppService<Usuario, UsuarioDTO>, IUsuarioAppService
    {
        private readonly IUsuarioService Service;
        private readonly INotificador Notificador;
        public UsuarioAppService(IMapper map, IUsuarioService service, INotificador notificador) : base(map)
        {
            this.Notificador = notificador;
            this.Service = service;
        }

        public async Task<bool> IsValidUser(CadastroUsuarioDTO cadastroUsuario) => 
            await Service.IsValidUser(base.Mapper.Map<Usuario>(cadastroUsuario));

        public async Task<Resultado<List<GenericList>>> GetGenericList() =>
            Resultado<List<GenericList>>.Successfull(base.MapToGenericList(await Service.GetUsers()));
        public async Task<Resultado<List<UsuarioDTO>>> GetUsers() =>
            Resultado<List<UsuarioDTO>>.Successfull(base.MapToDTO(await Service.GetUsers()));

        public async Task<Resultado<UsuarioDTO>> Update(AtualizacaoUsuarioDTO atualizacaoUsuario)
        {
            var usuario = base.Mapper.Map<Usuario>(atualizacaoUsuario);
            await Service.Update(usuario);
            var usuarioDTO = base.MapToDTO(usuario);

            return Notificador.HasNotification() ?
                Resultado<UsuarioDTO>.Failed(Notificador.GetNotifications().Select(x => x.Mensagem).ToArray()) :
                Resultado<UsuarioDTO>.Successfull(usuarioDTO);
        }

        public async Task<bool> IsActiveUser(string email) =>
            await Service.IsActiveUser(email);
    }
}