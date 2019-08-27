using System.Collections.Generic;
using Ouvidoria.Domain.Enums;

namespace Ouvidoria.Application.ViewModel
{
    public class PerguntaViewModel : EntityViewModel
    {
        public string descricao { get; set; }
        public TipoPergunta tipo { get; set; }
        public List<OpcaoViewModel> opcoes { get; set; }
    }
}