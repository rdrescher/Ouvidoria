using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Ouvidoria.Domain.Models;

namespace Ouvidoria.Services.Interfaces
{
    public interface IQuestionarioService : IDisposable
    {
        Task<List<Questionario>> GetQuizzes();
        Task Create(Questionario quiz);
    }
}