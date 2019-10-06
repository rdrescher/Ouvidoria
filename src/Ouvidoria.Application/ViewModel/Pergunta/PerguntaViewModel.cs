using Ouvidoria.Application.Enums;
using System.Collections.Generic;

namespace Ouvidoria.Application.ViewModel
{
    public class PerguntaViewModel : EntityViewModel
    {
        public string descricao { get; set; }
        public TipoPergunta tipo { get; set; }
        public List<OpcaoViewModel> opcoes { get; set; }
    }
}