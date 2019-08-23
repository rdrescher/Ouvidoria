using Ouvidoria.Domain.Enums;

namespace Ouvidoria.Application.ViewModel
{
    public class ManifestacaoViewModel : EntityViewModel
    {
        public string titulo { get; set; }
        public string descricao { get; set; }
        public string resposta { get; set; }
        public int departamento { get; set; }
        public int usuario { get; set; }
        public TipoManifestacao tipoManifestacao { get; set; }
    }
}