using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Ouvidoria.Domain.Interfaces;
using Ouvidoria.Domain.Models;
using Ouvidoria.Infrastructure.Context;

namespace Ouvidoria.Infrastructure.Repositories
{
    public class ManifestacaoRepository : EntityRepository<Manifestacao>, IManifestacaoRepository
    {
        public ManifestacaoRepository(OuvidoriaContext context) : base(context)
        { }

        public async Task<Manifestacao> GetByIdWithIncludes(int id) =>
            await DbSet
                .AsNoTracking()
                .Include(x => x.Usuario)
                .Include(x => x.Departamento)
                .Include(x => x.Interacoes)
                .ThenInclude(x => x.Usuario)
                .FirstOrDefaultAsync(x => x.Id == id);

        public async Task<List<Manifestacao>> GetWithIncludes() =>
            await DbSet
                .AsNoTracking()
                .Include(x => x.Usuario)
                .Include(x => x.Departamento)
                .Include(x => x.Interacoes)
                .ThenInclude(x => x.Usuario)
                .OrderByDescending(x => x.DataInsercao)
                .ToListAsync();

        public async Task<List<Manifestacao>> GetWithIncludes(Expression<Func<Manifestacao, bool>> predicate) =>
            await DbSet
                .AsNoTracking()
                .Include(x => x.Usuario)
                .Include(x => x.Departamento)
                .Include(x => x.Interacoes)
                .ThenInclude(x => x.Usuario)
                .Where(predicate)
                .OrderByDescending(x => x.DataInsercao)
                .ToListAsync();

    }
}