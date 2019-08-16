namespace Ouvidoria.Application.DTO
{
    public class AtualizacaoDepartamentoDTO
    {
        public int id { get; set; }
        public string nome { get; set; }
        public int? idUsuarioResponsavel { get; set; }
    }
}