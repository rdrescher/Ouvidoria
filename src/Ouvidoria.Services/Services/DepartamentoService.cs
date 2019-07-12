using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ouvidoria.Domain.Interfaces;
using Ouvidoria.Domain.Models;
using Ouvidoria.Domain.Validations.Models;
using Ouvidoria.Services.Interfaces;

namespace Ouvidoria.Services
{
    public class DepartamentoService : EntityService, IDepartamentoService
    {
        private readonly INotificador notificador;
        private readonly IDepartamentoRepository repository;
        private readonly IManifestacaoService manifestacaoService;
        private readonly IUsuarioService usuarioService;
        public DepartamentoService(
            IDepartamentoRepository repository,
            INotificador notificador,
            IUsuarioService usuarioService,
            IManifestacaoService manifestacaoService
        ) : base(notificador)
        {
            this.repository = repository;
            this.manifestacaoService = manifestacaoService;
            this.notificador = notificador;
            this.usuarioService = usuarioService;
        }

        public async Task Create(Departamento departamento)
        {
            if (!base.Validate(new DepartamentoValidation(), departamento)) return;
            if (!await IsValidOwner(departamento.IdUsuarioResponsavel)) return;
            await repository.Create(departamento);
            departamento = await repository.GetWithOwner(departamento.Id);
        }

        public async Task Delete(int id)
        {
            if (await HasManifestationsRegistered(id)) return;
            await repository.Delete(id);
        }

        public void Dispose()
        {
            repository.Dispose();
        }

        public async Task<List<Departamento>> GetDepartments() =>
            await repository.GetAllWithOwner();

        private async Task<bool> IsValidOwner(int? id)
        {
            if (id == null) return true;
            if (await usuarioService.GetUserById(id.Value) != null) return true;

            Notify("O usuário responsável informado é inválido");
            return false;
        }
        private async Task<bool> HasManifestationsRegistered(int id)
        {
            if(!(await manifestacaoService.GetByDepartment(id)).Any()) return false;
            Notify("O Departamento não pôde ser excluído pois há manifestações cadastradas em relação a ele");
            return true;
        }
    }
}