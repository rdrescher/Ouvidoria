using System;
using Ouvidoria.Domain.Core.Models;
using Ouvidoria.Domain.Enums;

namespace Ouvidoria.Domain.Models
{
    public class Usuario : Entity
    {
        public Usuario(
            string nome,
            string email,
            string telefone,
            string cpf,
            string senha,
            int idCurso,
            UsuarioPerfil usuarioPerfil
        )
        {
            this.Nome = nome;
            this.Email = email;
            this.Telefone = telefone;
            this.CPF = cpf;
            this.Senha = senha;
            this.IdCurso = idCurso;
            this.UsuarioPerfil = usuarioPerfil;
            this.Ativo = true;
            this.DataAtualizacao = DateTime.Now;
            this.DataInsercao = DateTime.Now;
        }
        protected Usuario() { }
        public string Nome { get; private set; }
        public string Email { get; private set; }
        public string Telefone { get; private set; }
        public string CPF { get; private set; }
        public string Senha { get; private set; }
        public bool Ativo { get; private set; }
        public int? IdCurso { get; private set; }
        public UsuarioPerfil UsuarioPerfil { get; private set; }
        public virtual Curso Curso { get; private set; }
    }
}