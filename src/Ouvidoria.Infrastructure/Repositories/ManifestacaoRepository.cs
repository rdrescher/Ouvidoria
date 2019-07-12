using Ouvidoria.Domain.Interfaces;
using Ouvidoria.Domain.Models;
using Ouvidoria.Infrastructure.Context;

namespace Ouvidoria.Infrastructure.Repositories
{
    public class ManifestacaoRepository : EntityRepository<Manifestacao>, IManifestacaoRepository
    {
        public ManifestacaoRepository(OuvidoriaContext context) : base(context)
        {
        }
    }
}