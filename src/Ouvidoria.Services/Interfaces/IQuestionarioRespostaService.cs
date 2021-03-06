using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Ouvidoria.Domain.Models;

namespace Ouvidoria.Services.Interfaces
{
    public interface IQuestionarioRespostaService : IDisposable
    {
        Task Create(QuestionarioResposta resposta);
        Task IsUserAbleToAnswer(int idQuestionario, int idUsuario);
        Task<List<QuestionarioResposta>> GetAnswersByQuiz(int idQuestionario);
        Task<QuestionarioResposta> GetByIdWithAnswers(int id);
    }
}