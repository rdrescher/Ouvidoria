using System.Collections.Generic;
using System.Threading.Tasks;
using Ouvidoria.Domain.Interfaces;
using Ouvidoria.Domain.Models;
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
        public void Dispose()
        {
            repository.Dispose();
        }

        public async Task<List<Usuario>> GetUsers() =>
            await repository.GetAll();
    }
}