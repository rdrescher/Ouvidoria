using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ouvidoria.Domain.DTO;
using Ouvidoria.Domain.Interfaces;
using Ouvidoria.Domain.Models;
using Ouvidoria.Domain.Validations.Models;
using Ouvidoria.Services.Interfaces;

namespace Ouvidoria.Services
{
    public class UsuarioService : EntityService, IUsuarioService
    {
        private readonly IUsuarioRepository repository;
        private readonly ICursoService cursoService;
        public UsuarioService(IUsuarioRepository repository, INotificador notificador, ICursoService cursoService) : base(notificador)
        {
            this.repository = repository;
            this.cursoService = cursoService;
        }

        public async Task<bool> IsValidUser(Usuario usuario)
        {
            if (!Validate(new UsuarioValidation(), usuario)) return false;
            if (await EmailAlreadyExists(usuario.Email)) return false;
            if (await CPFAlreadyExists(usuario.CPF)) return false;
            if (!await IsValidClass(usuario.IdCurso)) return false;

            return true;
        }

        public async Task<List<Usuario>> GetUsers() =>
            await repository.GetAll();

        public async Task<List<UsuarioDto>> GetUsersWithClass() =>
            await repository.GetAllWithClass();


        public async Task Update(Usuario usuario)
        {
            var (email, cpf) = await repository.GetEmailCPF(usuario.Id);
            usuario.AdjustToUpdate(email, cpf);
            if (!Validate(new UsuarioValidation(), usuario)) return;
            if (!await IsValidClass(usuario.IdCurso)) return;

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
            if ((await repository.Search(c => c.Email.Equals(email) && c.Id != id)).Any())
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

        public void Dispose() => repository.Dispose();

        public async Task<Usuario> GetUserById(int id) =>
            await repository.GetById(id);

        public async Task<bool> IsActiveUser(string email) =>
            (await repository.Search(u => u.Email == email)).FirstOrDefault().Ativo;

    }
}