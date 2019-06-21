using Ouvidoria.Domain.Interfaces;
using Ouvidoria.Domain.Models;
using Ouvidoria.Infrastructure.Context;

namespace Ouvidoria.Infrastructure.Repositories
{
    public class QuestionarioRepository : EntityRepository<Questionario>, IQuestionarioRepository
    {
        public QuestionarioRepository(OuvidoriaContext context) : base(context)
        {
        }
    }
}