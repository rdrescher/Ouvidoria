using AutoMapper;
using Ouvidoria.Application.DTOs;
using Ouvidoria.Domain.Models;

namespace Ouvidoria.Application.Services
{
    public class RespostaAppService : EntityAppService<Resposta, RespostaDTO>
    {
        public RespostaAppService(IMapper map) : base(map)
        { }
    }
}