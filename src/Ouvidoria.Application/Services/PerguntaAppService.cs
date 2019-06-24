using AutoMapper;
using Ouvidoria.Application.DTOs;
using Ouvidoria.Application.Interfaces;
using Ouvidoria.Domain.Models;

namespace Ouvidoria.Application.Services
{
    public class PerguntaAppService : EntityAppService<Pergunta, PerguntaDTO>, IPerguntaAppService
    {
        public PerguntaAppService(IMapper map) : base(map)
        { }
    }
}