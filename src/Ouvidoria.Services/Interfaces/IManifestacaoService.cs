using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Ouvidoria.Domain.Enums;
using Ouvidoria.Domain.Models;

namespace Ouvidoria.Services.Interfaces
{
    public interface IManifestacaoService : IDisposable
    {
        Task Create(Manifestacao manifestation);
        Task<Manifestacao> GetById(int idManifestacao);
        Task<List<Manifestacao>> GetByUser(int idUsuario);
        Task<List<Manifestacao>> GetByUser(int idUsuario, TipoManifestacao tipo);
        Task<List<Manifestacao>> GetAll();
        Task<List<Manifestacao>> GetAll(TipoManifestacao tipo);
        Task<Manifestacao> GetByIdWithDetails(int id, int idUsuario);
    }
}