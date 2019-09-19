using Ouvidoria.Domain.Interfaces;
using Ouvidoria.Domain.Models;
using Ouvidoria.Infrastructure.Context;

namespace Ouvidoria.Infrastructure.Repositories
{
    public class InteracaoRepository : EntityRepository<Interacao>, IInteracaoRepository
    {
        public InteracaoRepository(OuvidoriaContext context) : base(context)
        { }
    }
}