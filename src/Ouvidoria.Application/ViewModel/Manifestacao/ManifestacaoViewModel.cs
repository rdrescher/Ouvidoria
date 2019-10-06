using System.Collections.Generic;
using Ouvidoria.Application.Enums;

namespace Ouvidoria.Application.ViewModel
{
    public class ManifestacaoViewModel : EntityViewModel
    {
        public string titulo { get; set; }
        public string descricao { get; set; }
        public string departamento { get; set; }
        public string usuario { get; set; }
        public string dataCriacao { get; set; }
        public TipoManifestacao tipoManifestacao { get; set; }
        public List<InteracaoViewModel> interacoes { get; set; }
    }
}