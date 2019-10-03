using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Ouvidoria.Application.Interfaces;
using Ouvidoria.Application.Utils;
using Ouvidoria.Application.ViewModel;
using Ouvidoria.Domain.Interfaces;
using Ouvidoria.Domain.Models;
using Ouvidoria.Services.Interfaces;

namespace Ouvidoria.Application.Services
{
    public class QuestionarioRespostaAppService : EntityAppService<QuestionarioResposta, QuestionarioRespostaViewModel>, IQuestionarioRespostaAppService
    {
        private readonly IQuestionarioRespostaService _service;
        private readonly IRespostaService _respostaService;

        public QuestionarioRespostaAppService(
            IMapper map,
            INotificador notificador,
            IQuestionarioRespostaService service,
            IRespostaService respostaService
        ) : base(map, notificador)
        {
            _service = service;
            _respostaService = respostaService;
        }

        public async Task<Resultado> Create(CadastroQuestionarioRespostaViewModel resposta, int idUsuario)
        {
            var response = Mapper.Map<QuestionarioResposta>(resposta);
            response.SetUser(idUsuario);

            await _service.Create(response);

            return Notificador.HasNotification()
                ? Resultado.Failed(Notificador.GetNotificationsMessages())
                : Resultado.Successfull();
        }

        public async Task<Resultado<QuestionarioRespostaDetailViewModel>> GetAnswersById(int id)
        {
            var answers = Mapper.Map<QuestionarioRespostaDetailViewModel>(await _service.GetByIdWithAnswers(id));
            return Notificador.HasNotification()
                ? Resultado<QuestionarioRespostaDetailViewModel>.Failed(Notificador.GetNotificationsMessages())
                : Resultado<QuestionarioRespostaDetailViewModel>.Successfull(answers);
        }

        public async Task<Resultado<List<QuestionarioRespostaViewModel>>> GetAnswersByQuiz(int idQuestionario)
        {
            var answers = MapToViewModel(await _service.GetAnswersByQuiz(idQuestionario));
            return Notificador.HasNotification()
                ? Resultado<List<QuestionarioRespostaViewModel>>.Failed(Notificador.GetNotificationsMessages())
                : Resultado<List<QuestionarioRespostaViewModel>>.Successfull(answers);
        }

        public async Task<Resultado> IsUserAbleToAnswer(int idQuestionario, int idUsuario)
        {
            await _service.IsUserAbleToAnswer(idQuestionario, idUsuario);

            return Notificador.HasNotification()
                ? Resultado.Failed(Notificador.GetNotificationsMessages())
                : Resultado.Successfull();
        }
    }
}