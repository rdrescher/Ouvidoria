using AutoMapper;
using Ouvidoria.Application.ViewModel;
using Ouvidoria.Application.Interfaces;
using Ouvidoria.Domain.Models;
using Ouvidoria.Domain.Interfaces;

namespace Ouvidoria.Application.Services
{
    public class OpcaoAppService : EntityAppService<Opcao, OpcaoViewModel>, IOpcaoAppService
    {
        public OpcaoAppService(IMapper map, INotificador notificador) : base(map, notificador)
        { }
    }
}