using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Ouvidoria.Domain.Interfaces;
using Ouvidoria.Domain.Models;
using Ouvidoria.Infrastructure.Context;

namespace Ouvidoria.Infrastructure.Repositories
{
    public class InteracaoRepository : EntityRepository<Interacao>, IInteracaoRepository
    {
        public InteracaoRepository(OuvidoriaContext context) : base(context)
        { }

        public async Task<Interacao> GetWithUser(int id) => 
            await DbSet
                .Include(x => x.Usuario)
                .FirstOrDefaultAsync(x => x.Id == id);
                
    }
}