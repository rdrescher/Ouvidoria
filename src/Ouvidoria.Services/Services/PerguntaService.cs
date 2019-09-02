using Ouvidoria.Domain.Interfaces;
using Ouvidoria.Services.Interfaces;

namespace Ouvidoria.Services
{
    public class PerguntaService : EntityService, IPerguntaService
    {
        private readonly IPerguntaRepository repository;
        public PerguntaService(IPerguntaRepository repository, INotificador notificador) : base(notificador)
        { 
            this.repository = repository;
        }
        public void Dispose()
        {
            repository.Dispose();
        }
    }
}