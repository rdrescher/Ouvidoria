using System.ComponentModel.DataAnnotations;
using Ouvidoria.Domain.Enums;

namespace Ouvidoria.Application.DTO
{
    public class CadastroUsuarioDTO
    {
        public string nome { get; set; }
        public string email { get; set; }
        public string telefone { get; set; }
        public string cpf { get; set; }
        public string senha { get; set; }
        public string confirmaSenha { get; set; }
        public bool ativo { get; set; }
        public int? idCurso { get; set; }
    }
}