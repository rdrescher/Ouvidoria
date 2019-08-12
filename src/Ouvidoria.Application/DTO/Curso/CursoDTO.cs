using System.ComponentModel.DataAnnotations;

namespace Ouvidoria.Application.DTO
{
    public class CursoDTO : EntityDTO
    {
        [Required]
        public string nome { get; set; }
    }
}