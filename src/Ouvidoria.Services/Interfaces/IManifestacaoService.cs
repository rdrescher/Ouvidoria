using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Ouvidoria.Domain.Models;

namespace Ouvidoria.Services.Interfaces
{
    public interface IManifestacaoService : IDisposable
    {
        Task<List<Manifestacao>> GetByDepartment(int id);
    }
}