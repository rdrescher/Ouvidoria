using System;
using System.Linq;
using System.Threading.Tasks;
using Ouvidoria.Domain.Enums;
using Ouvidoria.Domain.Interfaces;
using Ouvidoria.Domain.Models;
using Ouvidoria.Domain.Validations.Models;
using Ouvidoria.Services.Interfaces;

namespace Ouvidoria.Services
{
    public class InteracaoService : EntityService, IInteracaoService
    {
        private readonly IInteracaoRepository _repository;
        private readonly IManifestacaoService _manifestationService;
        private readonly IUsuarioService _userService;
        private readonly IDepartamentoService _departamentService;
        public InteracaoService(
            IInteracaoRepository repository,
            INotificador notificador,
            IManifestacaoService manifestationService,
            IUsuarioService userService,
            IDepartamentoService departamentService
        ) : base(notificador)
        {
            _repository = repository;
            _manifestationService = manifestationService;
            _userService = userService;
            _departamentService = departamentService;
        }

        public async Task Create(Interacao reply)
        {
            if (!Validate(new InteracaoValidation(), reply)) return;
            if (!await IsValidManifestation(reply.IdManifestacao)) return;
            if (!await IsValidUser(reply.IdManifestacao, reply.IdUsuario)) return;

            await _repository.Create(reply);
        }

        private async Task<bool> IsValidUser(int idManifestacao, int idUsuario)
        {
            var manifestation = await _manifestationService.GetById(idManifestacao);
            var user = await _userService.GetUserByIdWithClaims(idUsuario);
            var department = await _departamentService.GetById(manifestation.IdDepartamento);
            var claims = user.Claims.Select(x => x.Valor).ToList();

            if (manifestation.IdUsuario == idUsuario
                || claims.Contains(UsuarioPerfil.Administrador.ToString())
                || department.IdUsuarioResponsavel == idUsuario)
                return true;

            Notify("Você não tem permissão para responder este questionário");
            return false;
        }

        private async Task<bool> IsValidManifestation(int idManifestacao)
        {
            var manifestation = await _manifestationService.GetById(idManifestacao);
            if (manifestation != null) return true;

            Notify("A manifestação informada é inválida");
            return false;
        }

        public void Dispose() => _repository.Dispose();
    }
}