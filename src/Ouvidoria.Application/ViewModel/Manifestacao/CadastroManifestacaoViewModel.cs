using Ouvidoria.Domain.Enums;

namespace Ouvidoria.Application.ViewModel
{
    public class CadastroManifestacaoViewModel
    {
        public string titulo { get; set; }
        public string descricao { get; set; }
        public int idDepartamento { get; set; }
        public TipoManifestacao tipoManifestacao { get; set; }
    }
}