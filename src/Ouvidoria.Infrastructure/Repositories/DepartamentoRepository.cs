using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Ouvidoria.Domain.Interfaces;
using Ouvidoria.Domain.Models;
using Ouvidoria.Infrastructure.Context;

namespace Ouvidoria.Infrastructure.Repositories
{
    public class DepartamentoRepository : EntityRepository<Departamento>, IDepartamentoRepository
    {
        public DepartamentoRepository(OuvidoriaContext context) : base(context)
        { }

        public async Task<List<Departamento>> GetAllWithOwner() =>
            await base.DbSet
                .AsNoTracking()
                .Include(x => x.Usuario)
                .ToListAsync();

        public async Task<Departamento> GetByIdWithManifestation(int id) =>
            await base.DbSet
                .AsNoTracking()
                .Include(x => x.Manifestacoes)
                .FirstOrDefaultAsync(x => x.Id == id);

        public async Task<Departamento> GetWithOwner(int id) =>
            await base.DbSet
                .AsNoTracking()
                .Include(x => x.Usuario)
                .FirstOrDefaultAsync(x => x.Id == id);
    }
}