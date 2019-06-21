using Ouvidoria.Domain.Interfaces;
using Ouvidoria.Domain.Models;
using Ouvidoria.Infrastructure.Context;

namespace Ouvidoria.Infrastructure.Repositories
{
    public class RespostaRepository : EntityRepository<Resposta>, IRespostaRepository
    {
        public RespostaRepository(OuvidoriaContext context) : base(context)
        {
        }
    }
}