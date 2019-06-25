using System.Collections.Generic;
using System.Threading.Tasks;
using Ouvidoria.Domain.Models;

namespace Ouvidoria.Domain.Interfaces
{
    public interface ICursoRepository : IEntityRepository<Curso>
    {
        Task<List<Usuario>> GetStudentsByClass(int id);
    }
}