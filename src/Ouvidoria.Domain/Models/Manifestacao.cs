using System;
using Ouvidoria.Domain.Enums;

namespace Ouvidoria.Domain.Models
{
    public class Manifestacao : Entity
    {
        public Manifestacao(
            string titulo, 
            string descricao, 
            string resposta, 
            int idDepartamento, 
            TipoManifestacao TipoManifestacao, 
            int idUsuario
        )
        {
            this.Titulo = titulo;
            this.Descricao = descricao;
            this.Resposta = resposta;
            this.IdDepartamento = idDepartamento;
            this.TipoManifestacao = TipoManifestacao;
            this.IdUsuario = idUsuario;
            this.DataAtualizacao = DateTime.Now;
            this.DataInsercao = DateTime.Now;
        }
        public Manifestacao() { }
        public string Titulo { get; private set; }
        public string Descricao { get; private set; }
        public string Resposta { get; private set; }
        public int IdDepartamento { get; private set; }
        public int IdUsuario { get; private set; }
        public virtual TipoManifestacao TipoManifestacao { get; private set; }
        public virtual Departamento Departamento { get; private set; }
        public virtual Usuario Usuario { get; private set; }
    }
}