using AutoMapper;
using Ouvidoria.Application.DTOs;
using Ouvidoria.Domain.Models;

namespace Ouvidoria.Application.Services
{
    public class PerguntaAppService : EntityAppService<Pergunta, PerguntaDTO>
    {
        public PerguntaAppService(IMapper map) : base(map)
        { }
    }
}