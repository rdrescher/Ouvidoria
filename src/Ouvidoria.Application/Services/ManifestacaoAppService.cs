using AutoMapper;
using Ouvidoria.Application.ViewModel;
using Ouvidoria.Application.Interfaces;
using Ouvidoria.Domain.Models;
using Ouvidoria.Application.Utils;
using System.Threading.Tasks;
using Ouvidoria.Domain.Interfaces;
using Ouvidoria.Services.Interfaces;

namespace Ouvidoria.Application.Services
{
    public class ManifestacaoAppService : EntityAppService<Manifestacao, ManifestacaoViewModel>, IManifestacaoAppService
    {
        private readonly IManifestacaoService _service;
        public ManifestacaoAppService(
            IMapper map, 
            INotificador notificador,
            IManifestacaoService service
        ) : base(map, notificador)
        {
            _service = service;
        }

        public async Task<Resultado> Create(CadastroManifestacaoViewModel manifestacao, int userId)
        {
            var manifestation = Mapper.Map<Manifestacao>(manifestacao);
            manifestation.SetCreator(userId);

            await _service.Create(manifestation);

            return Notificador.HasNotification()
                ? Resultado.Failed(Notificador.GetNotificationsMessages())
                : Resultado.Successfull();
        }
    }
}