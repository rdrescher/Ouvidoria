using System.Collections.Generic;
using System.Threading.Tasks;
using Ouvidoria.Domain.Interfaces;
using Ouvidoria.Domain.Models;
using Ouvidoria.Services.Interfaces;

namespace Ouvidoria.Services
{
    public class ManifestacaoService : EntityService, IManifestacaoService
    {
        private readonly IManifestacaoRepository repository;
        public ManifestacaoService(IManifestacaoRepository repository, INotificador notificador) : base(notificador)
        { 
            this.repository = repository;
        }
        public void Dispose()
        {
            repository.Dispose();
        }

        public async Task<List<Manifestacao>> GetByDepartment(int id) =>
            await repository.Search(x => x.IdDepartamento == id);
    }
}