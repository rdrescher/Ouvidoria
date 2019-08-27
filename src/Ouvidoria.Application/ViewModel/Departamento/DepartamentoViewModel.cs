namespace Ouvidoria.Application.ViewModel
{
    public class DepartamentoViewModel : EntityViewModel
    {
        public string nome { get; set; }
        public int? idUsuarioResponsavel { get; set; }
        public string usuarioResponsavel { get; set; }
    }
}