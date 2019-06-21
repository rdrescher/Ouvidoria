using Ouvidoria.Domain.Interfaces;
using Ouvidoria.Services.Interfaces;

namespace Ouvidoria.Services
{
    public class OpcaoService : EntityService, IOpcaoService
    {
        private readonly INotificador notificador;
        private readonly IOpcaoRepository repository;
        public OpcaoService(IOpcaoRepository repository, INotificador notificador) : base(notificador)
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