using Ouvidoria.Domain.Interfaces;
using Ouvidoria.Services.Interfaces;

namespace Ouvidoria.Services
{
    public class InteracaoService : EntityService, IInteracaoService
    {
        private readonly IInteracaoRepository _repository;
        public InteracaoService(
            IInteracaoRepository repository,
            INotificador notificador
        ) : base(notificador)
        {
            this._repository = repository;
        }
        public void Dispose() => _repository.Dispose();
    }
}