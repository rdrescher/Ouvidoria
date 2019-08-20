using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ouvidoria.Domain.Interfaces;
using Ouvidoria.Domain.Models;
using Ouvidoria.Domain.Validations.Models;
using Ouvidoria.Services.Interfaces;

namespace Ouvidoria.Services
{
    public class UsuarioService : EntityService, IUsuarioService
    {
        private readonly INotificador notificador;
        private readonly IUsuarioRepository repository;
        private readonly ICursoService cursoService;
        public UsuarioService(IUsuarioRepository repository, INotificador notificador, ICursoService cursoService) : base(notificador)
        {
            this.repository = repository;
            this.notificador = notificador;
            this.cursoService = cursoService;
        }

        public async Task Create(Usuario usuario)
        {
            if (!base.Validate(new UsuarioValidation(), usuario)) return;
            if (await this.EmailAlreadyExists(usuario.Email)) return;
            if (await this.CPFAlreadyExists(usuario.CPF)) return;
            if (!await this.IsValidClass(usuario.IdCurso)) return;

            await repository.Create(usuario);
        }

        public async Task<List<Usuario>> GetUsers() =>
            await repository.GetAllWithClass();


        public async Task Update(Usuario usuario)
        {
            var senha = await repository.GetPassword(usuario.Id);
            usuario.AjustToUpdate(senha);

            if (!base.Validate(new UsuarioValidation(), usuario)) return;
            if (await this.EmailAlreadyExists(usuario.Email, usuario.Id)) return;
            if (await this.CPFAlreadyExists(usuario.CPF, usuario.Id)) return;
            if (!await this.IsValidClass(usuario.IdCurso)) return;

            await repository.Update(usuario);
        }

        private async Task<bool> IsValidClass(int? idCurso)
        {
            if (idCurso == null) return true;
            if (await cursoService.GetById(idCurso.Value) != null) return true;
            Notify("O curso informado é inválido");
            return false;
        }

        private async Task<bool> EmailAlreadyExists(string email, int id = 0)
        {
            if ((await repository.Search(c => c.Email.Equals(email)  && c.Id != id)).Any())
            {
                Notify("Já existe um usuário com esse e-mail");
                return true;
            }
            return false;
        }

        private async Task<bool> CPFAlreadyExists(string cpf, int id = 0)
        {
            if ((await repository.Search(c => c.CPF.Equals(cpf) && c.Id != id)).Any())
            {
                Notify("Já existe um usuário com esse CPF");
                return true;
            }
            return false;
        }

        public void Dispose()
        {
            repository.Dispose();
        }

        public async Task<Usuario> GetUserById(int id) => 
            await repository.GetById(id);
    }
}