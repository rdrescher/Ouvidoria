using System;

namespace Ouvidoria.Application.ViewModel
{
    public class RespostaViewModel : EntityViewModel
    {
        public string retorno { get; set; }
        public int? idOpcao { get; set; }
        public int idPergunta { get; set; }
    }
}