using AutoMapper;
using Ouvidoria.Application.DTO;
using Ouvidoria.Application.Interfaces;
using Ouvidoria.Domain.Models;

namespace Ouvidoria.Application.Services
{
    public class ManifestacaoAppService : EntityAppService<Manifestacao, ManifestacaoDTO>, IManifestacaoAppService
    {
        public ManifestacaoAppService(IMapper map) : base(map)
        { }
    }
}