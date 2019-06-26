using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Ouvidoria.Application.DTOs;
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

        public async Task<Resultado<List<UsuarioDTO>>> GetUsers() =>
            Resultado<List<UsuarioDTO>>.Successfull(base.Mapper.Map<List<UsuarioDTO>>(await Service.GetUsers()));
    }
}