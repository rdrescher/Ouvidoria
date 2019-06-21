using Ouvidoria.Domain.Interfaces;
using Ouvidoria.Domain.Models;
using Ouvidoria.Infrastructure.Context;

namespace Ouvidoria.Infrastructure.Repositories
{
    public class DepartamentoRepository : EntityRepository<Departamento>, IDepartamentoRepository
    {
        public DepartamentoRepository(OuvidoriaContext context) : base(context)
        { }
        
    }
}