using System;
using Ouvidoria.Domain.Core.Models;

namespace Ouvidoria.Domain.Models
{
    public class Curso : Entity
    {
        public Curso(string nome)
        {
            this.Nome = nome;
            this.DataAtualizacao = DateTime.Now;
            this.DataInsercao = DateTime.Now;
        }
        protected Curso() { }
        public string Nome { get; private set; }
    }
}