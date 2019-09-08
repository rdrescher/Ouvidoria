using System.Threading.Tasks;
using Ouvidoria.Application.Utils;
using Ouvidoria.Application.ViewModel;

namespace Ouvidoria.Application.Interfaces
{
    public interface IQuestionarioRespostaAppService
    {
        Task<Resultado> Create(CadastroQuestionarioRespostaViewModel resposta, int idUsuario);
    }
}