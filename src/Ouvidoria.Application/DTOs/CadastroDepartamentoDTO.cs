namespace Ouvidoria.Application.DTOs
{
    public class CadastroDepartamentoDTO : EntityDTO
    {
        public string nome { get; set; }
        public int? idUsuarioResponsavel { get; set; }
    }
}