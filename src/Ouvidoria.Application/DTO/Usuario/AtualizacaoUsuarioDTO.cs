using Ouvidoria.Application.Enums;

namespace Ouvidoria.Application.DTO
{
    public class AtualizacaoUsuarioDTO : EntityDTO
    {
        public string nome { get; set; }
        public string telefone { get; set; }
        public bool ativo { get; set; }
        public int? idCurso { get; set; }
        public UsuarioPerfil UsuarioPerfil { get; set; }
    }
}