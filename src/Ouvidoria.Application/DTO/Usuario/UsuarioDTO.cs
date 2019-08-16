using Ouvidoria.Domain.Enums;

namespace Ouvidoria.Application.DTO
{
    public class UsuarioDTO : EntityDTO
    {
        public string nome { get; set; }
        public string email { get; set; }
        public string telefone { get; set; }
        public string cpf { get; set; }
        public bool ativo { get; set; }
        public int? idCurso { get; set; }
        public UsuarioPerfil usuarioPerfil { get; set; }
        public CursoDTO curso { get; set; }
    }
}