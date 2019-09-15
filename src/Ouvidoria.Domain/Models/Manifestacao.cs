using System;
using Ouvidoria.Domain.Enums;

namespace Ouvidoria.Domain.Models
{
    public class Manifestacao : Entity
    {
        #region Constructors
        public Manifestacao(
            string titulo,
            string descricao,
            string resposta,
            int idDepartamento,
            TipoManifestacao tipoManifestacao,
            int idUsuario
        ) : this(titulo, descricao, idDepartamento, tipoManifestacao)
        {
            Resposta = resposta;
            IdUsuario = idUsuario;
        }

        public Manifestacao(
            string titulo,
            string descricao,
            int idDepartamento,
            TipoManifestacao tipoManifestacao
        ) : this()
        {
            Titulo = titulo;
            Descricao = descricao;
            IdDepartamento = idDepartamento;
            TipoManifestacao = tipoManifestacao;
        }

        public Manifestacao()
        {
            DataAtualizacao = DateTime.Now;
            DataInsercao = DateTime.Now;
        }
        #endregion

        #region Properties 
        public string Titulo { get; private set; }
        public string Descricao { get; private set; }
        public string Resposta { get; private set; }
        public int IdDepartamento { get; private set; }
        public int IdUsuario { get; private set; }
        public TipoManifestacao TipoManifestacao { get; private set; }
        public virtual Departamento Departamento { get; private set; }
        public virtual Usuario Usuario { get; private set; }
        #endregion

        #region Methods
        public void SetCreator(int idUsuario) => IdUsuario = idUsuario;
        #endregion
    }
}