using AutoMapper;
using Ouvidoria.Application.ViewModel;
using Ouvidoria.Application.Interfaces;
using Ouvidoria.Domain.Models;

namespace Ouvidoria.Application.Services
{
    public class RespostaAppService : EntityAppService<Resposta, RespostaViewModel>, IRespostaAppService
    {
        public RespostaAppService(IMapper map) : base(map)
        { }
    }
}