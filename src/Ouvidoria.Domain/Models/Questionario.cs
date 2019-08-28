using System;
using System.Collections.Generic;

namespace Ouvidoria.Domain.Models
{
    public class Questionario : Entity
    {
        public Questionario(string titulo, string descricao, DateTime dtInicio, DateTime dtFim)
        {
            Titulo = titulo;
            Descricao = descricao;
            DataInicio = dtInicio;
            DataFim = dtFim;
            DataAtualizacao = DateTime.Now;
            DataInsercao = DateTime.Now;
        }
        public Questionario() { }
        public string Titulo { get; private set; }
        public string Descricao { get; private set; }
        public DateTime DataInicio { get; private set; }
        public DateTime DataFim { get; private set; }
        public int IdUsuarioCriador { get; private set; }
        public List<Pergunta> Perguntas { get; private set; }
        public virtual Usuario Usuario { get; private set; }
        public virtual List<QuestionarioResposta> QuestionarioRespostas { get; private set; }

        public void ChangeCreator(int id) => IdUsuarioCriador = id;
    }
}