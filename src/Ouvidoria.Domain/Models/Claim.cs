namespace Ouvidoria.Domain.Models
{
    public class Claim
    {
        public int Id { get; set; }
        public int IdUser { get; set; }
        public string Valor { get; set; }
        public string Tipo { get; set; }
        public virtual Usuario Usuario { get; set; }
    }
}