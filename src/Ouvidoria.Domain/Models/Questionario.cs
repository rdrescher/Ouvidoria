using System;
using System.Collections.Generic;

namespace Ouvidoria.Domain.Models
{
    public class Questionario : Entity
    {
        public Questionario(string titulo, string descricao, DateTime dtInicio, DateTime dtFim, int idUsuarioCriador)
        {
            this.Titulo = titulo;
            this.Descricao = descricao;
            this.DataInicio = dtInicio;
            this.DataFim = dtFim;
            this.IdUsuarioCriador = idUsuarioCriador;
            this.DataAtualizacao = DateTime.Now;
            this.DataInsercao = DateTime.Now;
        }
        public Questionario() { }
        public string Titulo { get; private set; }
        public string Descricao { get; private set; }
        public DateTime DataInicio { get; private set; }
        public DateTime DataFim { get; private set; }
        public int IdUsuarioCriador { get; private set; }
        public List<Pergunta> Pergunta { get; private set; }
        public virtual Usuario Usuario { get; private set; }
        public virtual List<QuestionarioResposta> QuestionarioResposta { get; private set; }
    }
}