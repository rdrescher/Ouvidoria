using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ouvidoria.Domain.Interfaces;
using Ouvidoria.Domain.Models;
using Ouvidoria.Domain.Validations.Models;
using Ouvidoria.Services.Interfaces;

namespace Ouvidoria.Services
{
    public class CursoService : EntityService, ICursoService
    {
        private readonly ICursoRepository repository;
        public CursoService(ICursoRepository repository, INotificador notificador) : base(notificador)
        {
            this.repository = repository;
        }

        public async Task Create(Curso curso)
        {
            if (!base.Validate(new CursoValidation(), curso)) return;
            if (await this.ClassNameAlreadyExists(curso.Nome)) return;

            await repository.Create(curso);
        }

        public async Task<List<Curso>> GetClasses() =>
            await repository.GetAll();

        public async Task Update(Curso curso)
        {
            if (!base.Validate(new CursoValidation(), curso)) return;
            if (await this.ClassNameAlreadyExists(curso.Nome)) return;

            await repository.Update(curso);
        }
        public void Dispose() =>
            repository.Dispose();

        private async Task<bool> ClassNameAlreadyExists(string nome)
        {
            if (!(await repository.Search(c => c.Nome.Equals(nome))).Any()) return false;
            Notify("Já existe um curso com esse nome");
            return true;
        }

        public async Task Delete(int id)
        {
            if ((await repository.GetStudentsByClass(id)).Any())
            {
                Notify("Existem usuários cadastrados com esse curso");
                return;
            }
            await repository.Delete(id);
        }
    }
}