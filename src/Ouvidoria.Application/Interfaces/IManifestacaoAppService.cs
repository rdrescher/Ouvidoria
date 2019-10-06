using Ouvidoria.Application.Enums;
using Ouvidoria.Application.Utils;
using Ouvidoria.Application.ViewModel;
using Ouvidoria.Domain.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Ouvidoria.Application.Interfaces
{
    public interface IManifestacaoAppService : IEntityAppService<Manifestacao, ManifestacaoViewModel>
    {
        Task<Resultado> Create(CadastroManifestacaoViewModel manifestacao);
        Task<Resultado<InteracaoViewModel>> Reply(CadastroInteracaoViewModel resposta);
        Task<Resultado<List<ManifestacaoPeviewViewModel>>> GetByUser();
        Task<Resultado<List<ManifestacaoPeviewViewModel>>> GetByUser(TipoManifestacao tipo);
        Task<Resultado<List<ManifestacaoPeviewViewModel>>> GetAll();
        Task<Resultado<List<ManifestacaoPeviewViewModel>>> GetAll(TipoManifestacao tipo);
        Task<Resultado<ManifestacaoViewModel>> GetById(int id);
    }
}