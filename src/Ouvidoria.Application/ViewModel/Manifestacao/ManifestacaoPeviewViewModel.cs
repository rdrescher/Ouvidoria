using Ouvidoria.Application.Enums;

namespace Ouvidoria.Application.ViewModel
{
    public class ManifestacaoPeviewViewModel : EntityViewModel
    {
        public string titulo { get; set; }
        public string descricao { get; set; }
        public string departamento { get; set; }
        public string usuario { get; set; }
        public int numeroInteracoes { get; set; }
        public string usuarioUltimaInteracao { get; set; }
        public string dataCriacao { get; set; }
        public TipoManifestacao tipoManifestacao { get; set; }
    }
}