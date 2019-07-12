using System.Collections.Generic;
using System.Threading.Tasks;
using Ouvidoria.Domain.Interfaces;
using Ouvidoria.Domain.Models;
using Ouvidoria.Services.Interfaces;

namespace Ouvidoria.Services
{
    public class ManifestacaoService : EntityService, IManifestacaoService
    {
        private readonly INotificador notificador;
        private readonly IManifestacaoRepository repository;
        public ManifestacaoService(IManifestacaoRepository repository, INotificador notificador) : base(notificador)
        { 
            this.repository = repository;
            this.notificador = notificador;
        }
        public void Dispose()
        {
            repository.Dispose();
        }

        public async Task<List<Manifestacao>> GetByDepartment(int id) =>
            await repository.Search(x => x.IdDepartamento == id);
    }
}