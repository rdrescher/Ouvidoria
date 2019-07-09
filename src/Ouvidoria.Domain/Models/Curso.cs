using System;
using System.Collections.Generic;

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
        public Curso() { }
        public string Nome { get; private set; }

        public virtual List<Usuario> Usuarios { get; set; }
    }
}