using AutoMapper;
using Ouvidoria.Application.ViewModel;
using Ouvidoria.Application.Interfaces;
using Ouvidoria.Domain.Models;

namespace Ouvidoria.Application.Services
{
    public class PerguntaAppService : EntityAppService<Pergunta, PerguntaViewModel>, IPerguntaAppService
    {
        public PerguntaAppService(IMapper map) : base(map)
        { }
    }
}