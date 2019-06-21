using Ouvidoria.Domain.Interfaces;
using Ouvidoria.Domain.Models;
using Ouvidoria.Infrastructure.Context;

namespace Ouvidoria.Infrastructure.Repositories
{
    public class CursoRepository : EntityRepository<Curso>, ICursoRepository
    {
        public CursoRepository(OuvidoriaContext context) : base(context)
        { }
    }
}