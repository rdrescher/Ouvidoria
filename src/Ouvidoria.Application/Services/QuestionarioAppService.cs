using AutoMapper;
using Ouvidoria.Application.DTOs;
using Ouvidoria.Application.Interfaces;
using Ouvidoria.Domain.Models;

namespace Ouvidoria.Application.Services
{
    public class QuestionarioAppService : EntityAppService<Questionario, QuestionarioDTO>, IQuestionarioAppService
    {
        public QuestionarioAppService(IMapper map) : base(map)
        { }
    }
}