using System.Collections.Generic;
using Ouvidoria.Domain.Enums;

namespace Ouvidoria.Application.ViewModel
{
    public class CadastroPerguntaViewModel
    {
        public string descricao { get; set; }
        public TipoPergunta tipo { get; set; }
        public List<CadastroOpcaoViewModel> opcoes { get; set; }
    }
}