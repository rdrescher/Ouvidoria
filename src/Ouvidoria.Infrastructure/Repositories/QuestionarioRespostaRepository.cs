using Ouvidoria.Domain.Interfaces;
using Ouvidoria.Domain.Models;
using Ouvidoria.Infrastructure.Context;
using System;
using System.Collections.Generic;
using System.Text;

namespace Ouvidoria.Infrastructure.Repositories
{
    public class QuestionarioRespostaRepository : EntityRepository<QuestionarioResposta>, IQuestionarioRespostaRepository
    {
        public QuestionarioRespostaRepository(OuvidoriaContext context) : base(context)
        {
        }
    }
}
