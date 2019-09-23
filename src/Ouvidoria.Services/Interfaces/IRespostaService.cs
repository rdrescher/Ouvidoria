using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Ouvidoria.Domain.Models;

namespace Ouvidoria.Services.Interfaces
{
    public interface IRespostaService : IDisposable
    {
        Task<List<Resposta>> GetAnswersById(int id);
    }
}