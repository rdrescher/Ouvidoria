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
        private readonly INotificador _notificador;
        public QuestionarioAppService(
            IMapper map,
            IQuestionarioService service,
            INotificador notificador) : base(map)
        {
            _service = service;
            _notificador = notificador;
        }

        public async Task<Resultado<QuestionarioViewModel>> Create(CadastroQuestionarioViewModel questionario, int userId)
        {
            var quiz = Mapper.Map<Questionario>(questionario);
            quiz.ChangeCreator(userId);
            await _service.Create(quiz);
            return _notificador.HasNotification()
                ? Resultado<QuestionarioViewModel>.Failed(_notificador.GetNotificationsMessages())
                : Resultado<QuestionarioViewModel>.Successfull(MapToViewModel(quiz));
        }

        public async Task<Resultado<List<QuestionarioPreviewViewModel>>> GetPreviewList(int userId)
        {
            var quizzesPreview = Mapper.Map<List<QuestionarioPreviewViewModel>>(await _service.GetPreviewList(userId));
            return Resultado<List<QuestionarioPreviewViewModel>>.Successfull(quizzesPreview);
        }

        public async Task<Resultado<List<QuestionarioDetailViewModel>>> GetQuizzes()
        {
            var quizzes = Mapper.Map<List<QuestionarioDetailViewModel>>(await _service.GetQuizzes());
            return Resultado<List<QuestionarioDetailViewModel>>.Successfull(quizzes);
        }

    }
}