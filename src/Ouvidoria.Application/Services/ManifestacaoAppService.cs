using AutoMapper;
using Ouvidoria.Application.ViewModel;
using Ouvidoria.Application.Interfaces;
using Ouvidoria.Domain.Models;

namespace Ouvidoria.Application.Services
{
    public class ManifestacaoAppService : EntityAppService<Manifestacao, ManifestacaoViewModel>, IManifestacaoAppService
    {
        public ManifestacaoAppService(IMapper map) : base(map)
        { }
    }
}