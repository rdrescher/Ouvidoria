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
        { }

        public async Task<List<Usuario>> GetAllWithClass() =>
            await base.DbSet.Include(x => x.Curso).ToListAsync();

        public async Task<(string email, string cpf)> GetEmailCPF(int id)
        {
            var user = await DbSet.AsNoTracking().FirstOrDefaultAsync(u => u.Id == id);
            return (user.Email, user.CPF);
        }
    }
}