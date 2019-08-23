using Ouvidoria.Application.Enums;

namespace Ouvidoria.Application.ViewModel
{
    public class UsuarioViewModel : EntityViewModel
    {
        public string nome { get; set; }
        public string email { get; set; }
        public string telefone { get; set; }
        public string cpf { get; set; }
        public bool ativo { get; set; }
        public int? idCurso { get; set; }
        public UsuarioPerfil usuarioPerfil { get; set; }
        public CursoViewModel curso { get; set; }
    }
}