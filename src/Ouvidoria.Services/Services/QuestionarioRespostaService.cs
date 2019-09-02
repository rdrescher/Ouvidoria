using Ouvidoria.Domain.Interfaces;
using Ouvidoria.Services.Interfaces;

namespace Ouvidoria.Services
{
    public class QuestionarioRespostaService : EntityService, IQuestionarioRespostaService
    {
        private readonly IQuestionarioRespostaRepository repository;
        public QuestionarioRespostaService(IQuestionarioRespostaRepository repository, INotificador notificador) : base(notificador)
        { 
            this.repository = repository;
        }
        public void Dispose()
        {
            repository.Dispose();
        }
    }
}