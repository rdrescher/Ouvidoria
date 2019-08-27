using AutoMapper;
using Ouvidoria.Application.ViewModel;
using Ouvidoria.Application.Interfaces;
using Ouvidoria.Domain.Models;

namespace Ouvidoria.Application.Services
{
    public class QuestionarioAppService : EntityAppService<Questionario, QuestionarioViewModel>, IQuestionarioAppService
    {
        public QuestionarioAppService(IMapper map) : base(map)
        { }
    }
}