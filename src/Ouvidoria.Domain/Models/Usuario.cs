using System;
using System.Collections.Generic;
using Ouvidoria.Domain.Enums;
using Ouvidoria.Domain.Utils;

namespace Ouvidoria.Domain.Models
{
    public class Usuario : Entity
    {
        public Usuario(
            string nome,
            string email,
            string telefone,
            string cpf,
            int? idCurso
        )
        {
            this.Nome = nome;
            this.Email = email;
            this.Telefone = telefone;
            this.CPF = cpf;
            this.IdCurso = idCurso;
            this.Ativo = true;
            this.DataAtualizacao = DateTime.Now;
            this.DataInsercao = DateTime.Now;
        }
        public Usuario() { }
        public string Nome { get; private set; }
        public string Email { get; private set; }
        public string Telefone { get; private set; }
        public string CPF { get; private set; }
        public bool Ativo { get; private set; }
        public int? IdCurso { get; private set; }
        public virtual Curso Curso { get; private set; }
        public virtual List<Departamento> Departamento { get; private set; }
        public virtual List<Manifestacao> Manifestacoes { get; private set; }
        public virtual List<Questionario> Questionarios { get; private set; }
        public virtual List<QuestionarioResposta> QuestionarioResposta { get; private set; }

        public void AdjustToUpdate(string email, string cpf)
        {
            this.Email = email;
            this.CPF = cpf;
            this.Curso = null;
        }
    }
}