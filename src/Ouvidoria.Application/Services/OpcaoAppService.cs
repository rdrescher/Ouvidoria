using AutoMapper;
using Ouvidoria.Application.DTOs;
using Ouvidoria.Application.Interfaces;
using Ouvidoria.Domain.Models;

namespace Ouvidoria.Application.Services
{
    public class OpcaoAppService : EntityAppService<Opcao, OpcaoDTO>, IOpcaoAppService
    {
        public OpcaoAppService(IMapper map) : base(map)
        { }
    }
}