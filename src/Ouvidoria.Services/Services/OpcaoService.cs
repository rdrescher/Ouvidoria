using Ouvidoria.Domain.Interfaces;
using Ouvidoria.Services.Interfaces;

namespace Ouvidoria.Services
{
    public class OpcaoService : EntityService, IOpcaoService
    {
        private readonly IOpcaoRepository repository;
        public OpcaoService(IOpcaoRepository repository, INotificador notificador) : base(notificador)
        { 
            this.repository = repository;
        }
        public void Dispose()
        {
            repository.Dispose();
        }
    }
}