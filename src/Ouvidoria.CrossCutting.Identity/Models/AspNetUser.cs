using System;
using Microsoft.AspNetCore.Identity;

namespace Ouvidoria.CrossCutting.Identity.Models
{
    public class AspNetUser : IdentityUser<int>
    {
        public AspNetUser(string nome, string email, string cpf, string telefone, int? IdCurso, bool ativo)
        {
            this.Nome = nome;
            this.Email = email;
            this.CPF = cpf;
            this.PhoneNumber = telefone;
            this.IdCurso = IdCurso;
            this.Ativo = ativo;
            this.DataAtualizacao = DateTime.Now;
            this.DataInsercao = DateTime.Now;
            this.UserName = email;
            this.EmailConfirmed = true;
        }

        public AspNetUser()
        { }

        public string Nome { get; private set; }
        public string CPF { get; private set; }
        public bool Ativo { get; private set; }
        public int? IdCurso { get; private set; }
        public virtual DateTime DataAtualizacao { get; private set; }
        public virtual DateTime DataInsercao { get; private set; }
    }
}