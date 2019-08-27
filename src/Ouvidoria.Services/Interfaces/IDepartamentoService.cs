using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Ouvidoria.Domain.Models;

namespace Ouvidoria.Services.Interfaces
{
    public interface IDepartamentoService : IDisposable
    {
        Task<List<Departamento>> GetDepartments();
        Task Create(Departamento departamento);
        Task Delete(int id);
        Task Update(Departamento departamento);
    }
}