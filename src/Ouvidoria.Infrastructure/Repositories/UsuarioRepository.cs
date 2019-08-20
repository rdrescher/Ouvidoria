using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
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

        public async Task<List<Usuario>> GetAllWithClass() =>
            await base.DbSet.Include(x => x.Curso).ToListAsync();

        public async Task<string> GetPassword(int id)
        {
            //TODO
            return await base.DbSet.Where(x => x.Id == id)
                .Select(x => x.Nome)
                .FirstOrDefaultAsync();
        }
    }
}