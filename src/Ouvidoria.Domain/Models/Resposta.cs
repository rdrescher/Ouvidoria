using System;

namespace Ouvidoria.Domain.Models
{
    public class Resposta : Entity
    {
        public Resposta(string retorno, int idPergunta)
        {
            this.Retorno = retorno;
            this.IdPergunta = idPergunta;
            this.DataAtualizacao = DateTime.Now;
            this.DataInsercao = DateTime.Now;
        }
        public Resposta(int idOpcao, int idPergunta)
        {
            this.IdOpcao = IdOpcao;
            this.IdPergunta = idPergunta;
            this.DataAtualizacao = DateTime.Now;
            this.DataInsercao = DateTime.Now;
        }
        public Resposta() { }
        public string Retorno { get; private set; }
        public int? IdOpcao { get; private set; }
        public int IdPergunta { get; private set; }
        public int IdQuestionarioResposta { get; private set; }
        public virtual Opcao Opcao { get; private set; }
        public virtual Pergunta Pergunta { get; private set; }
        public virtual QuestionarioResposta QuestionarioResposta { get; private set; }
    }
}