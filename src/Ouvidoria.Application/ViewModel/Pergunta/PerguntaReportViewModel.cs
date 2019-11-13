using System.Collections.Generic;
using Ouvidoria.Application.Enums;

namespace Ouvidoria.Application.ViewModel
{
    public class PerguntaReportViewModel
    {
        public string titulo { get; set; }
        public TipoPergunta tipoPergunta { get; set; }
        public string[] respostas { get; set; }
        public List<OpcaoReportViewModel> opcoes { get; set; }
    }
}