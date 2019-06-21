using System;
using System.Collections.Generic;

namespace Ouvidoria.Domain.Models
{
    public class Departamento : Entity
    {
        public Departamento(string nome)
        {
            this.Nome = nome;
            this.DataAtualizacao = DateTime.Now;
            this.DataInsercao = DateTime.Now;
        }
        public Departamento(string nome, int idUsuarioResponsavel)
        {
            this.Nome = nome;
            this.IdUsuarioResponsavel = idUsuarioResponsavel;
            this.DataAtualizacao = DateTime.Now;
            this.DataInsercao = DateTime.Now;
        }
        public Departamento() { }
        public string Nome { get; private set; }
        public int? IdUsuarioResponsavel { get; private set; }
        public virtual Usuario Usuario { get; private set; }
        public virtual List<Manifestacao> Manifestacoes { get; private set; }
    }
}