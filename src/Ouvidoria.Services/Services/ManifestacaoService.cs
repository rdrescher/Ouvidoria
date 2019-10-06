using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ouvidoria.Domain.Enums;
using Ouvidoria.Domain.Interfaces;
using Ouvidoria.Domain.Models;
using Ouvidoria.Domain.Validations.Models;
using Ouvidoria.Services.Interfaces;

namespace Ouvidoria.Services
{
    public class ManifestacaoService : EntityService, IManifestacaoService
    {
        private readonly IManifestacaoRepository _repository;
        private readonly IDepartamentoService _departamentoService;
        private readonly IUsuarioService _usuarioService;

        public ManifestacaoService(
            IManifestacaoRepository repository,
            INotificador notificador,
            IDepartamentoService departamentoService,
            IUsuarioService usuarioService
        ) : base(notificador)
        {
            _repository = repository;
            _departamentoService = departamentoService;
            _usuarioService = usuarioService;
        }

        public async Task Create(Manifestacao manifestation)
        {
            if (!Validate(new ManifestacaoValidation(), manifestation)) return;
            if (!await ValidateDepartment(manifestation.IdDepartamento)) return;
            if (!await ValidateUser(manifestation.IdUsuario)) return;

            await _repository.Create(manifestation);
        }

        public void Dispose() => _repository.Dispose();

        public async Task<List<Manifestacao>> GetAll() =>
            await _repository.GetWithIncludes();

        public async Task<List<Manifestacao>> GetAll(TipoManifestacao tipo) =>
            await _repository.GetWithIncludes(x => x.TipoManifestacao == tipo);

        public async Task<Manifestacao> GetById(int idManifestacao) =>
            await _repository.GetById(idManifestacao);

        public async Task<Manifestacao> GetByIdWithDetails(int id, int idUsuario)
        {
            var manifestation = await _repository.GetByIdWithIncludes(id);

            if (manifestation == null)
                Notify("Manifestação não encontrada");
            else
                await UserHasPermission(manifestation, idUsuario);

            return manifestation;
        }

        public async Task<List<Manifestacao>> GetByUser(int idUsuario) =>
            await _repository.GetWithIncludes(x => x.IdUsuario == idUsuario);

        public async Task<List<Manifestacao>> GetByUser(int idUsuario, TipoManifestacao tipo) =>
            await _repository.GetWithIncludes(x => x.IdUsuario == idUsuario && x.TipoManifestacao == tipo);

        private async Task<bool> ValidateDepartment(int idDepartamento)
        {
            if (await _departamentoService.GetById(idDepartamento) != null) return true;

            Notify("Departamento não encontrado");
            return false;
        }

        private async Task<bool> ValidateUser(int idUsuario)
        {
            var user = await _usuarioService.GetUserById(idUsuario);
            if (user.Ativo) return true;

            Notify("Você está inapto para responder");
            return false;
        }


        private async Task UserHasPermission(Manifestacao manifestacao, int idUsuario)
        {
            var user = await _usuarioService.GetUserByIdWithClaims(idUsuario);
            var claims = user.Claims.Select(x => x.Valor).ToList();

            if (manifestacao.IdUsuario == idUsuario
                || claims.Contains(UsuarioPerfil.Administrador.ToString())
                || manifestacao.Departamento.IdUsuarioResponsavel == idUsuario)
                return;

            Notify("Você não tem permissão para visualizar esta manifestação");
        }
    }
}