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
        public UsuarioService(IUsuarioRepository repository, INotificador notificador) : base(notificador)
        {
            this.repository = repository;
            this.notificador = notificador;
        }

        public async Task Create(Usuario usuario)
        {
            if (!base.Validate(new UsuarioValidation(), usuario)) return;
            if (await this.EmailCPFAlreadyExists(usuario.Email, usuario.CPF)) return;
            usuario.HashPassword();
            
            await repository.Create(usuario);
        }

        public async Task<List<Usuario>> GetUsers() =>
            await repository.GetAllWithClass();

        public void Dispose()
        {
            repository.Dispose();
        }

        private async Task<bool> EmailCPFAlreadyExists(string email, string cpf)
        {
            if ((await repository.Search(c => c.Email.Equals(email))).Any())
            {
                Notify("Já existe um usuário com esse e-mail");
                return true;
            }
            if((await repository.Search(c => c.CPF.Equals(cpf))).Any())
            {
                Notify("Já existe um usuário com esse CPF");
                return true;
            }
            return false;
        }
    }
}