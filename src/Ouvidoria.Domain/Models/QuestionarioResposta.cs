using System;
using System.Collections.Generic;

namespace Ouvidoria.Domain.Models
{
    public class QuestionarioResposta : Entity
    {
        public QuestionarioResposta(int idQuestionario, int idUsuario)
        {
            this.IdQuestionario = idQuestionario;
            this.IdUsuario = idUsuario;
            this.DataAtualizacao = DateTime.Now;
            this.DataInsercao = DateTime.Now;
        }
        public QuestionarioResposta() { }
        public int IdQuestionario { get; private set; }
        public int IdUsuario { get; private set; }
        public List<Resposta> Resposta { get; private set; }
        public virtual Questionario Questionario { get; private set; }
        public virtual Usuario Usuario { get; private set; }
    }
}