using Ouvidoria.Domain.Interfaces;
using Ouvidoria.Domain.Models;
using Ouvidoria.Infrastructure.Context;

namespace Ouvidoria.Infrastructure.Repositories
{
    public class UsuarioRepository : EntityRepository<Usuario>, IUsuarioRepository
    {
        public UsuarioRepository(OuvidoriaContext context) : base(context)
        {
        }
    }
}