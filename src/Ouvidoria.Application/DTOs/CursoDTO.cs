using System.ComponentModel.DataAnnotations;

namespace Ouvidoria.Application.DTOs
{
    public class CursoDTO : EntityDTO
    {
        [Required]
        public string nome { get; set; }
    }
}