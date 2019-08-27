using System;
using Microsoft.AspNetCore.Identity;

namespace Ouvidoria.CrossCutting.Identity.Models
{
    public class AspNetUser : IdentityUser<int>
    {
        public AspNetUser(string nome, string email, string cpf, string telefone, int? idCurso, bool ativo)
        {
            Nome = nome;
            Email = email;
            CPF = cpf;
            PhoneNumber = telefone;
            IdCurso = idCurso;
            Ativo = ativo;
            DataAtualizacao = DateTime.Now;
            DataInsercao = DateTime.Now;
            UserName = email;
            EmailConfirmed = true;
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