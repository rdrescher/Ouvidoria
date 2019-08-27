using System.ComponentModel.DataAnnotations;
using Ouvidoria.Domain.Enums;

namespace Ouvidoria.Application.ViewModel
{
    public class CadastroUsuarioViewModel
    {
        public string nome { get; set; }
        public string email { get; set; }
        public string telefone { get; set; }
        public string cpf { get; set; }
        public string senha { get; set; }
        public string confirmaSenha { get; set; }
        public int? idCurso { get; set; }
    }
}