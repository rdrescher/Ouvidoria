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
        private readonly IDepartamentoRepository _repository;
        private readonly IUsuarioService _usuarioService;
        public DepartamentoService(
            IDepartamentoRepository repository,
            INotificador notificador,
            IUsuarioService usuarioService
        ) : base(notificador)
        {
            _repository = repository;
            _usuarioService = usuarioService;
        }

        public async Task Create(Departamento departamento)
        {
            if (!base.Validate(new DepartamentoValidation(), departamento)) return;
            if (!await IsValidOwner(departamento.IdUsuarioResponsavel)) return;

            await _repository.Create(departamento);
            departamento = await _repository.GetWithOwner(departamento.Id);
        }

        public async Task Delete(int id)
        {
            if (await HasManifestationsRegistered(id)) return;
            await _repository.Delete(id);
        }

        public async Task Update(Departamento departamento)
        {
            if (!base.Validate(new DepartamentoValidation(), departamento)) return;
            if (!await IsValidOwner(departamento.IdUsuarioResponsavel)) return;

            await _repository.Update(departamento);
            departamento = await _repository.GetWithOwner(departamento.Id);
        }

        public async Task<List<Departamento>> GetDepartments() =>
            await _repository.GetAllWithOwner();

        public async Task<Departamento> GetById(int idDepartamento) =>
            await _repository.GetById(idDepartamento);

        public void Dispose() => _repository.Dispose();

        private async Task<bool> IsValidOwner(int? id)
        {
            if (id == null) return true;
            if (await _usuarioService.GetUserById(id.Value) is Usuario user && user.Ativo) return true;

            Notify("O usuário responsável informado é inválido ou está inativo");
            return false;
        }
        private async Task<bool> HasManifestationsRegistered(int id)
        {
            if (!(await _repository.GetByIdWithManifestation(id)).Manifestacoes.Any()) return false;

            Notify("O Departamento não pôde ser excluído pois há manifestações cadastradas em relação a ele");
            return true;
        }
    }
}