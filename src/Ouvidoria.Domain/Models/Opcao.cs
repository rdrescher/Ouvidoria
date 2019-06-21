using System;
using System.Collections.Generic;

namespace Ouvidoria.Domain.Models
{
    public class Opcao : Entity
    {
        public Opcao(string descricao)
        {
            this.Descricao = descricao;
            this.DataAtualizacao = DateTime.Now;
            this.DataInsercao = DateTime.Now;
        }
        public Opcao() { }
        public string Descricao { get; private set; }
        public int IdPergunta { get; private set; }
        public virtual Pergunta Pergunta { get; private set; }
        public virtual List<Resposta> Respostas { get; private set; }
    }
}