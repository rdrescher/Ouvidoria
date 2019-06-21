using Ouvidoria.Domain.Interfaces;
using Ouvidoria.Services.Interfaces;

namespace Ouvidoria.Services
{
    public class PerguntaService : EntityService, IPerguntaService
    {
        private readonly INotificador notificador;
        private readonly IPerguntaRepository repository;
        public PerguntaService(IPerguntaRepository repository, INotificador notificador) : base(notificador)
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