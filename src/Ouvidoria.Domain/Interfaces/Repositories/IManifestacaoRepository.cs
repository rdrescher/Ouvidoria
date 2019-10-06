using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Ouvidoria.Domain.Models;

namespace Ouvidoria.Domain.Interfaces
{
    public interface IManifestacaoRepository : IEntityRepository<Manifestacao>
    {
        Task<List<Manifestacao>> GetWithIncludes();
        Task<List<Manifestacao>> GetWithIncludes(Expression<Func<Manifestacao, bool>> predicate);
        Task<Manifestacao> GetByIdWithIncludes(int id);
    }
}