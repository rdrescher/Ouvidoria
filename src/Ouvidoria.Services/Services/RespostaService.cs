using Ouvidoria.Domain.Interfaces;
using Ouvidoria.Services.Interfaces;

namespace Ouvidoria.Services
{
    public class RespostaService : EntityService, IRespostaService
    {
        private readonly INotificador notificador;
        private readonly IRespostaRepository repository;
        public RespostaService(IRespostaRepository repository, INotificador notificador) : base(notificador)
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