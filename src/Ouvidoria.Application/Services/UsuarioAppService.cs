using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Ouvidoria.Application.ViewModel;
using Ouvidoria.Application.Interfaces;
using Ouvidoria.Application.Utils;
using Ouvidoria.Domain.Interfaces;
using Ouvidoria.Domain.Models;
using Ouvidoria.Services.Interfaces;

namespace Ouvidoria.Application.Services
{
    public class UsuarioAppService : EntityAppService<Usuario, UsuarioViewModel>, IUsuarioAppService
    {
        private readonly IUsuarioService Service;
        private readonly INotificador Notificador;
        public UsuarioAppService(IMapper map, IUsuarioService service, INotificador notificador) : base(map)
        {
            this.Notificador = notificador;
            this.Service = service;
        }

        public async Task<bool> IsValidUser(CadastroUsuarioViewModel cadastroUsuario) =>
            await Service.IsValidUser(Mapper.Map<Usuario>(cadastroUsuario));

        public async Task<Resultado<List<GenericList>>> GetGenericList() =>
            Resultado<List<GenericList>>.Successfull(MapToGenericList(await Service.GetUsers()));
        public async Task<Resultado<List<UsuarioViewModel>>> GetUsers() =>
            Resultado<List<UsuarioViewModel>>.Successfull(Mapper.Map<List<UsuarioViewModel>>(await Service.GetUsersWithClass()));

        public async Task<Resultado<UsuarioViewModel>> Update(AtualizacaoUsuarioViewModel atualizacaoUsuario)
        {
            var usuario = base.Mapper.Map<Usuario>(atualizacaoUsuario);
            await Service.Update(usuario);
            var usuarioViewModel = base.MapToViewModel(usuario);
            usuarioViewModel.usuarioPerfil = atualizacaoUsuario.UsuarioPerfil;

            return Notificador.HasNotification()
                ? Resultado<UsuarioViewModel>.Failed(Notificador.GetNotificationsMessages())
                : Resultado<UsuarioViewModel>.Successfull(usuarioViewModel);
        }

        public async Task<bool> IsActiveUser(string email) =>
            await Service.IsActiveUser(email);
    }
}