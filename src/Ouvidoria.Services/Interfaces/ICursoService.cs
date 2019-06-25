using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Ouvidoria.Domain.Models;

namespace Ouvidoria.Services.Interfaces
{
    public interface ICursoService : IDisposable
    {
        Task<List<Curso>> GetClasses();
        Task Update(Curso curso);
        Task Create(Curso curso);
        Task Delete(int id);
    }
}