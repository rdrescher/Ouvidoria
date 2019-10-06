using AutoMapper;
using Ouvidoria.Application.ViewModel;
using Ouvidoria.Application.Interfaces;
using Ouvidoria.Domain.Models;
using Ouvidoria.Domain.Interfaces;

namespace Ouvidoria.Application.Services
{
    public class PerguntaAppService : EntityAppService<Pergunta, PerguntaViewModel>, IPerguntaAppService
    {
        public PerguntaAppService(IMapper map, INotificador notificador) : base(map, notificador)
        { }
    }
}