using Ouvidoria.Domain.Interfaces;
using Ouvidoria.Services.Interfaces;

namespace Ouvidoria.Services
{
    public class QuestionarioService : EntityService, IQuestionarioService
    {
        private readonly INotificador notificador;
        private readonly IQuestionarioRepository repository;
        public QuestionarioService(IQuestionarioRepository repository, INotificador notificador) : base(notificador)
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