using Ouvidoria.Domain.Interfaces;
using Ouvidoria.Services.Interfaces;

namespace Ouvidoria.Services
{
    public class DepartamentoService : EntityService, IDepartamentoService
    {
        private readonly INotificador notificador;
        private readonly IDepartamentoRepository repository;
        public DepartamentoService(IDepartamentoRepository repository, INotificador notificador) : base(notificador)
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