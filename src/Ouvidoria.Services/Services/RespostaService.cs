using System.Collections.Generic;
using System.Threading.Tasks;
using Ouvidoria.Domain.Interfaces;
using Ouvidoria.Domain.Models;
using Ouvidoria.Services.Interfaces;

namespace Ouvidoria.Services
{
    public class RespostaService : EntityService, IRespostaService
    {
        private readonly IRespostaRepository _repository;
        public RespostaService(IRespostaRepository repository, INotificador notificador) : base(notificador)
        { 
            _repository = repository;
        }
        public void Dispose() => _repository.Dispose();
    }
}