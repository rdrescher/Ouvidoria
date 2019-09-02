using Ouvidoria.Domain.Enums;
using Ouvidoria.Domain.Models;

namespace Ouvidoria.Domain.DTO
{
    public class UsuarioDto
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Email { get; set; }
        public string Telefone { get; set; }
        public string CPF { get; set; }
        public bool Ativo { get; set; }
        public int? IdCurso { get; set; }
        public UsuarioPerfil UsuarioPerfil { get; set; }
        public virtual Curso Curso { get; set; }
    }
}