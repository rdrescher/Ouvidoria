using AutoMapper;
using Ouvidoria.Application.DTOs;
using Ouvidoria.Domain.Models;

namespace Ouvidoria.Application.Services
{
    public class OpcaoAppService : EntityAppService<Opcao, OpcaoDTO>
    {
        public OpcaoAppService(IMapper map) : base(map)
        { }
    }
}