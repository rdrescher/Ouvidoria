using Ouvidoria.Domain.Interfaces;
using Ouvidoria.Domain.Models;
using Ouvidoria.Infrastructure.Context;

namespace Ouvidoria.Infrastructure.Repositories
{
    public class OpcaoRepository : EntityRepository<Opcao>, IOpcaoRepository
    {
        public OpcaoRepository(OuvidoriaContext context) : base(context)
        {
        }
    }
}