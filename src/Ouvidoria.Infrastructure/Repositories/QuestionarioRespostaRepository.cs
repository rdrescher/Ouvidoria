﻿using Microsoft.EntityFrameworkCore;
using Ouvidoria.Domain.Interfaces;
using Ouvidoria.Domain.Models;
using Ouvidoria.Infrastructure.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ouvidoria.Infrastructure.Repositories
{
    public class QuestionarioRespostaRepository : EntityRepository<QuestionarioResposta>, IQuestionarioRespostaRepository
    {
        public QuestionarioRespostaRepository(OuvidoriaContext context) : base(context)
        {
        }

        public async Task<List<QuestionarioResposta>> GetAnsersByQuiz(int idQuestionario) =>
            await DbSet
                .AsNoTracking()
                .Include(x => x.Usuario)
                .Where(x => x.IdQuestionario == idQuestionario)
                .ToListAsync();

        public async Task<QuestionarioResposta> GetByIdWithIncludes(int id) =>
            await DbSet
                .AsNoTracking()
                .Include(x => x.Usuario)
                .Include(x => x.Questionario)
                .Include(x => x.Respostas)
                .ThenInclude(x => x.Opcao)
                .Include(x => x.Respostas)
                .ThenInclude(x => x.Pergunta)
                .FirstOrDefaultAsync(x => x.Id == id);
    }
}
