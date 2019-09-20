namespace Ouvidoria.Domain.Models
{
    public class Interacao : Entity
    {
        public string Descricao { get; private set; }
        public int IdManifestacao { get; set; }
        public int IdUsuario { get; set; }
        public virtual Manifestacao Manifestacao { get; set; }
        public virtual Usuario Usuario { get; set; }
    }
}