using Ouvidoria.Domain.Interfaces;
using Ouvidoria.Domain.Models;
using Ouvidoria.Infrastructure.Context;

namespace Ouvidoria.Infrastructure.Repositories
{
    public class PerguntaRepository : EntityRepository<Pergunta>, IPerguntaRepository
    {
        public PerguntaRepository(OuvidoriaContext context) : base(context)
        {
        }
    }
}