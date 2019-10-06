using AutoMapper;
using Ouvidoria.Application.Enums;
using Ouvidoria.Application.Interfaces;
using Ouvidoria.Application.Utils;
using Ouvidoria.Application.ViewModel;
using Ouvidoria.Domain.Interfaces;
using Ouvidoria.Domain.Models;
using Ouvidoria.Services.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Ouvidoria.Application.Services
{
    public class ManifestacaoAppService : EntityAppService<Manifestacao, ManifestacaoViewModel>, IManifestacaoAppService
    {
        private readonly IManifestacaoService _service;
        private readonly IInteracaoService _interationService;
        private readonly IUser _user;

        public ManifestacaoAppService(
            IMapper map,
            INotificador notificador,
            IManifestacaoService service,
            IInteracaoService interationService,
            IUser user
        ) : base(map, notificador)
        {
            _service = service;
            _interationService = interationService;
            _user = user;
        }

        public async Task<Resultado> Create(CadastroManifestacaoViewModel manifestacao)
        {
            var manifestation = Mapper.Map<Manifestacao>(manifestacao);
            manifestation.SetCreator(_user.GetId());

            await _service.Create(manifestation);

            return Notificador.HasNotification()
                ? Resultado.Failed(Notificador.GetNotificationsMessages())
                : Resultado.Successfull();
        }

        public async Task<Resultado<List<ManifestacaoPeviewViewModel>>> GetAll()
        {
            var manifestations = Mapper.Map<List<ManifestacaoPeviewViewModel>>(await _service.GetAll());

            return Resultado<List<ManifestacaoPeviewViewModel>>.Successfull(manifestations);
        }

        public async Task<Resultado<List<ManifestacaoPeviewViewModel>>> GetAll(TipoManifestacao tipo)
        {
            var manifestations = Mapper.Map<List<ManifestacaoPeviewViewModel>>(await _service.GetAll((Domain.Enums.TipoManifestacao)tipo));

            return Resultado<List<ManifestacaoPeviewViewModel>>.Successfull(manifestations);
        }

        public async Task<Resultado<ManifestacaoViewModel>> GetById(int id)
        {
            var manifestation = MapToViewModel(await _service.GetByIdWithDetails(id, _user.GetId()));

            return Notificador.HasNotification()
                ? Resultado<ManifestacaoViewModel>.Failed(Notificador.GetNotificationsMessages())
                : Resultado<ManifestacaoViewModel>.Successfull(manifestation);
        }

        public async Task<Resultado<List<ManifestacaoPeviewViewModel>>> GetByUser()
        {
            var manifestations = Mapper.Map<List<ManifestacaoPeviewViewModel>>(await _service.GetByUser(_user.GetId()));

            return Resultado<List<ManifestacaoPeviewViewModel>>.Successfull(manifestations);
        }

        public async Task<Resultado<List<ManifestacaoPeviewViewModel>>> GetByUser(TipoManifestacao tipo)
        {
            var manifestations = Mapper.Map<List<ManifestacaoPeviewViewModel>>(await _service.GetByUser(_user.GetId(), (Domain.Enums.TipoManifestacao)tipo));

            return Resultado<List<ManifestacaoPeviewViewModel>>.Successfull(manifestations);
        }

        public async Task<Resultado<InteracaoViewModel>> Reply(CadastroInteracaoViewModel resposta)
        {
            var reply = Mapper.Map<Interacao>(resposta);
            reply.SetCreator(_user.GetId());

            await _interationService.Create(reply);

            var interaction = Mapper.Map<InteracaoViewModel>(reply);

            return Notificador.HasNotification()
                ? Resultado<InteracaoViewModel>.Failed(Notificador.GetNotificationsMessages())
                : Resultado<InteracaoViewModel>.Successfull(interaction);
        }
    }
}