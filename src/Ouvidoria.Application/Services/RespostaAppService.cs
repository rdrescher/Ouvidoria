using AutoMapper;
using Ouvidoria.Application.DTO;
using Ouvidoria.Application.Interfaces;
using Ouvidoria.Domain.Models;

namespace Ouvidoria.Application.Services
{
    public class RespostaAppService : EntityAppService<Resposta, RespostaDTO>, IRespostaAppService
    {
        public RespostaAppService(IMapper map) : base(map)
        { }
    }
}