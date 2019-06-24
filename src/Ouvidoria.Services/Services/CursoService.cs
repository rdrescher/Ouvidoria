using System.Collections.Generic;
using System.Threading.Tasks;
using Ouvidoria.Domain.Interfaces;
using Ouvidoria.Domain.Models;
using Ouvidoria.Services.Interfaces;

namespace Ouvidoria.Services
{
    public class CursoService : EntityService, ICursoService
    {
        private readonly INotificador notificador;
        private readonly ICursoRepository repository;
        public CursoService(ICursoRepository repository, INotificador notificador) : base(notificador)
        { 
            this.repository = repository;
            this.notificador = notificador;
        }
        public void Dispose()
        {
            repository.Dispose();
        }

        public async Task<List<Curso>> GetClasses()
        {
            return await repository.GetAll();
        }

        public async Task<Curso> Update(Curso curso)
        {
            await repository.Update(curso);
            return curso;
        }
    }
}