using AutoMapper;
using Ouvidoria.Application.ViewModel;
using Ouvidoria.Application.Interfaces;
using Ouvidoria.Domain.Models;

namespace Ouvidoria.Application.Services
{
    public class OpcaoAppService : EntityAppService<Opcao, OpcaoViewModel>, IOpcaoAppService
    {
        public OpcaoAppService(IMapper map) : base(map)
        { }
    }
}