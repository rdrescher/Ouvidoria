using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Ouvidoria.Domain.Interfaces;
using Ouvidoria.Domain.Models;
using Ouvidoria.Infrastructure.Context;

namespace Ouvidoria.Infrastructure.Repositories
{
    public class RespostaRepository : EntityRepository<Resposta>, IRespostaRepository
    {
        public RespostaRepository(OuvidoriaContext context) : base(context)
        {
        }

        public async Task<List<Resposta>> GetAnswersById(int id)
        {
            var res = await DbSet
                .AsNoTracking()
                .Include(x => x.Pergunta)
                .Include(x => x.Opcao)
                .Where(x => x.IdQuestionarioResposta == id)
                .ToListAsync();
            
            return res;
        }
    }
}