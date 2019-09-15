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

        public QuestionarioRespostaAppService(
            IMapper map,
            INotificador notificador,
            IQuestionarioRespostaService service
        ) : base(map, notificador)
        {
            _service = service;
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

        public async Task<Resultado> IsUserAbleToAnswer(int idQuestionario, int idUsuario)
        {
            await _service.IsUserAbleToAnswer(idQuestionario, idUsuario);

            return Notificador.HasNotification()
                ? Resultado.Failed(Notificador.GetNotificationsMessages())
                : Resultado.Successfull();
        }
    }
}