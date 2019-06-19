using System;
using System.Collections.Generic;
using Ouvidoria.Domain.Core.Models;
using Ouvidoria.Domain.Enums;

namespace Ouvidoria.Domain.Models
{
    public class Pergunta : Entity
    {
        public Pergunta(string descricao, TipoPergunta tipo)
        {
            this.Descricao = descricao;
            this.Tipo = tipo;
            this.DataAtualizacao = DateTime.Now;
            this.DataInsercao = DateTime.Now;
        }
        protected Pergunta() { }
        public string Descricao { get; private set; }
        public TipoPergunta Tipo { get; private set; }
        public List<Opcao> Opcoes { get; private set; }
        public int IdQuestionario { get; private set; }
        public virtual Questionario Questionario { get; private set; }

    }
}