using System.Collections.Generic;
using System.Threading.Tasks;
using Ouvidoria.Domain.Models;

namespace Ouvidoria.Domain.Interfaces
{
    public interface IDepartamentoRepository : IEntityRepository<Departamento>
    {
        Task<List<Departamento>> GetAllWithOwner();
        Task<Departamento> GetWithOwner(int id);
        Task<Departamento> GetByIdWithManifestation(int id);
    }
}