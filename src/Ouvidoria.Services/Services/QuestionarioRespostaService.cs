using Ouvidoria.Domain.Interfaces;
using Ouvidoria.Services.Interfaces;

namespace Ouvidoria.Services
{
    public class QuestionarioRespostaService : EntityService, IQuestionarioRespostaService
    {
        private readonly INotificador notificador;
        private readonly IQuestionarioRespostaRepository repository;
        public QuestionarioRespostaService(IQuestionarioRespostaRepository repository, INotificador notificador) : base(notificador)
        { 
            this.repository = repository;
            this.notificador = notificador;
        }
        public void Dispose()
        {
            repository.Dispose();
        }
    }
}