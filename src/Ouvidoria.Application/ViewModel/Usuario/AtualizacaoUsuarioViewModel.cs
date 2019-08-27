using Ouvidoria.Application.Enums;

namespace Ouvidoria.Application.ViewModel
{
    public class AtualizacaoUsuarioViewModel : EntityViewModel
    {
        public string nome { get; set; }
        public string telefone { get; set; }
        public bool ativo { get; set; }
        public int? idCurso { get; set; }
        public UsuarioPerfil UsuarioPerfil { get; set; }
    }
}