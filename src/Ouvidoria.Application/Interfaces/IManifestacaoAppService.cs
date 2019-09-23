using System.Threading.Tasks;
using Ouvidoria.Application.Utils;
using Ouvidoria.Application.ViewModel;
using Ouvidoria.Domain.Models;

namespace Ouvidoria.Application.Interfaces
{
    public interface IManifestacaoAppService : IEntityAppService<Manifestacao, ManifestacaoViewModel>
    {
        Task<Resultado> Create(CadastroManifestacaoViewModel manifestacao, int userId);
        Task<Resultado> Reply(CadastroInteracaoViewModel resposta, int userId);
    }
}