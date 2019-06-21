using AutoMapper;
using Ouvidoria.Application.DTOs;
using Ouvidoria.Domain.Models;

namespace Ouvidoria.Application.Services
{
    public class QuestionarioAppService : EntityAppService<Questionario, QuestionarioDTO>
    {
        public QuestionarioAppService(IMapper map) : base(map)
        { }
    }
}