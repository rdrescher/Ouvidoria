using AutoMapper;
using Ouvidoria.Application.DTOs;
using Ouvidoria.Application.Interfaces;
using Ouvidoria.Domain.Models;

namespace Ouvidoria.Application.Services
{
    public class UsuarioAppService : EntityAppService<Usuario, UsuarioDTO>, IUsuarioAppService
    {
        public UsuarioAppService(IMapper map) : base(map)
        { }
    }
}