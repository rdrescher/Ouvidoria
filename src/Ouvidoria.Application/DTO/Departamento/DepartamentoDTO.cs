namespace Ouvidoria.Application.DTO
{
    public class DepartamentoDTO : EntityDTO
    {
        public string nome { get; set; }
        public int? idUsuarioResponsavel { get; set; }
        public string usuarioResponsavel { get; set; }
    }
}