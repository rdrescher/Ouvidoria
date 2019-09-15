using AutoMapper;
using Ouvidoria.Application.ViewModel;
using Ouvidoria.Application.Interfaces;
using Ouvidoria.Domain.Models;
using Ouvidoria.Application.Utils;
using System.Threading.Tasks;
using Ouvidoria.Services.Interfaces;
using System.Collections.Generic;
using Ouvidoria.Domain.Interfaces;
using System.Linq;
using System;

namespace Ouvidoria.Application.Services
{
    public class QuestionarioAppService : EntityAppService<Questionario, QuestionarioViewModel>, IQuestionarioAppService
    {
        private readonly IQuestionarioService _service;
        public QuestionarioAppService(
            IMapper map,
            INotificador notificador,
            IQuestionarioService service
        ) : base(map, notificador)
        {
            _service = service;
        }

        public async Task<Resultado<QuestionarioViewModel>> GetById(int idQuestionario) =>
            Resultado<QuestionarioViewModel>.Successfull(MapToViewModel(await _service.GetById(idQuestionario)));

        public async Task<Resultado> Create(CadastroQuestionarioViewModel questionario, int userId)
        {
            var quiz = Mapper.Map<Questionario>(questionario);
            quiz.SetCreator(userId);
            await _service.Create(quiz);
            return Notificador.HasNotification()
                ? Resultado.Failed(Notificador.GetNotificationsMessages())
                : Resultado.Successfull();
        }

        public async Task<Resultado<List<QuestionarioPreviewViewModel>>> GetPreviewList(int userId)
        {
            var quizzesPreview = Mapper.Map<List<QuestionarioPreviewViewModel>>(await _service.GetPreviewList(userId));
            return Resultado<List<QuestionarioPreviewViewModel>>.Successfull(quizzesPreview);
        }

        public async Task<Resultado<List<DetalheQuestionarioViewModel>>> GetQuizzes()
        {
            var quizzes = Mapper.Map<List<DetalheQuestionarioViewModel>>(await _service.GetQuizzes());
            return Resultado<List<DetalheQuestionarioViewModel>>.Successfull(quizzes);
        }

    }
}