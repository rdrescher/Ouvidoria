using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Ouvidoria.Domain.Interfaces;
using Ouvidoria.Domain.Models;
using Ouvidoria.Infrastructure.Context;

namespace Ouvidoria.Infrastructure.Repositories
{
    public class CursoRepository : EntityRepository<Curso>, ICursoRepository
    {
        public CursoRepository(OuvidoriaContext context) : base(context)
        { }

        public async Task<List<Usuario>> GetStudentsByClass(int id) =>
            await Db.Usuarios.Where(x => x.IdCurso == id).ToListAsync();
    }
}