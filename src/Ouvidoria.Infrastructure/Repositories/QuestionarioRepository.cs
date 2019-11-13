using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Ouvidoria.Domain.DTO;
using Ouvidoria.Domain.Enums;
using Ouvidoria.Domain.Interfaces;
using Ouvidoria.Domain.Models;
using Ouvidoria.Infrastructure.Context;

namespace Ouvidoria.Infrastructure.Repositories
{
    public class QuestionarioRepository : EntityRepository<Questionario>, IQuestionarioRepository
    {
        public QuestionarioRepository(OuvidoriaContext context) : base(context)
        { }

        public async Task<List<Questionario>> GetAllInfos() =>
            await DbSet.AsNoTracking()
                .Include(x => x.Usuario)
                .Include(x => x.Perguntas)
                .Include(x => x.QuestionarioRespostas)
                .ToListAsync();

        public async Task<Questionario> GetByIdWithQuestions(int idQuestionario) =>
            await DbSet.AsNoTracking()
                .Include(x => x.Perguntas)
                .ThenInclude(x => x.Opcoes)
                .FirstOrDefaultAsync(x => x.Id == idQuestionario);
        public async Task<List<Questionario>> GetPreviewList(int userId) =>
            await DbSet.AsNoTracking()
                .Include(x => x.QuestionarioRespostas)
                .Where(x => x.DataInicio < DateTime.Now
                         && x.DataFim > DateTime.Now
                         && (x.QuestionarioRespostas.Count == 0
                             || !x.QuestionarioRespostas
                                  .Select(q => q.IdUsuario)
                                  .Contains(userId)))
                .ToListAsync();

        public async Task<QuestionarioDTO> GetQuizForReport(int id) =>
            await DbSet
                .AsNoTracking()
                .Include(x => x.QuestionarioRespostas)
                .Include(x => x.Perguntas)
                .ThenInclude(x => x.Respostas)
                .Include(x => x.Perguntas)
                .ThenInclude(x => x.Opcoes)
                .ThenInclude(x => x.Respostas)
                .Where(x => x.Id == id)
                .Select(q => new QuestionarioDTO
                {
                    Id = q.Id,
                    Descricao = q.Descricao,
                    Titulo = q.Titulo,
                    NumeroRespostas = q.QuestionarioRespostas.Count,
                    Perguntas = q.Perguntas.Select(p => new PerguntaDTO
                    {
                        TipoPergunta = p.Tipo,
                        Titulo = p.Descricao,
                        Respostas = p.Tipo == TipoPergunta.Dissertativa
                            ? p.Respostas.Select(r => r.Retorno).ToArray()
                            : null,
                        Opcoes = p.Tipo == TipoPergunta.Objetiva
                            ? p.Opcoes.Select(o => new OpcaoDTO
                            {
                                Descricao = o.Descricao,
                                NumeroEscolhas = o.Respostas.Count
                            }).ToList()
                            : null
                    })
                    .ToList()
                })
                .FirstOrDefaultAsync();
    }
}