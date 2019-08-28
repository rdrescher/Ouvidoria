using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Ouvidoria.Domain.Interfaces;
using Ouvidoria.Domain.Models;
using Ouvidoria.Infrastructure.Context;

namespace Ouvidoria.Infrastructure.Repositories
{
    public class QuestionarioRepository : EntityRepository<Questionario>, IQuestionarioRepository
    {
        public QuestionarioRepository(OuvidoriaContext context) : base(context)
        { }

        public Task<List<Questionario>> GetAllInfos() =>
            DbSet.AsNoTracking()
                .Include(x => x.Usuario)
                .Include(x => x.Perguntas)
                .Include(x => x.QuestionarioRespostas)
                .ToListAsync();
    }
}