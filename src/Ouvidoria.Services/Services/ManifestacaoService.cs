using System;
using System.Collections.Generic;
using System.Threading.Tasks;
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
    }
}