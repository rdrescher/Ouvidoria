using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Ouvidoria.Application.ViewModel;
using Ouvidoria.Application.Interfaces;
using Ouvidoria.Application.Utils;
using Ouvidoria.Domain.Interfaces;
using Ouvidoria.Domain.Models;
using Ouvidoria.Services.Interfaces;

namespace Ouvidoria.Application.Services
{
    public class DepartamentoAppService : EntityAppService<Departamento, DepartamentoViewModel>, IDepartamentoAppService
    {
        private readonly IDepartamentoService _service;
        public DepartamentoAppService(
            IMapper map,
            INotificador notificador,
            IDepartamentoService service
        ) : base(map, notificador)
        {
            _service = service;
        }

        public async Task<Resultado<DepartamentoViewModel>> Create(CadastroDepartamentoViewModel cadastroDepartamentoViewModel)
        {
            var Departamento = base.Mapper.Map<Departamento>(cadastroDepartamentoViewModel);
            await _service.Create(Departamento);
            var DepartamentoViewModel = base.MapToViewModel(Departamento);

            return Notificador.HasNotification() ?
                Resultado<DepartamentoViewModel>.Failed(Notificador.GetNotifications().Select(x => x.Mensagem).ToArray()) :
                Resultado<DepartamentoViewModel>.Successfull(DepartamentoViewModel);
        }

        public async Task<Resultado<List<DepartamentoViewModel>>> GetDepartments() =>
            Resultado<List<DepartamentoViewModel>>.Successfull(base.MapToViewModel(await _service.GetDepartments()));

        public async Task<Resultado> Delete(int id)
        {
            await _service.Delete(id);
            return Notificador.HasNotification() ?
                Resultado.Failed(Notificador.GetNotifications().Select(x => x.Mensagem).ToArray()) :
                Resultado.Successfull();
        }

        public async Task<Resultado<DepartamentoViewModel>> Update(AtualizacaoDepartamentoViewModel atualizacaoDepartamentoViewModel)
        {
            var Departamento = base.Mapper.Map<Departamento>(atualizacaoDepartamentoViewModel);
            await _service.Update(Departamento);
            var DepartamentoViewModel = base.MapToViewModel(Departamento);

            return Notificador.HasNotification() ?
                Resultado<DepartamentoViewModel>.Failed(Notificador.GetNotifications().Select(x => x.Mensagem).ToArray()) :
                Resultado<DepartamentoViewModel>.Successfull(DepartamentoViewModel);
        }

        public async Task<Resultado<List<GenericList>>> GetGenericList() =>
            Resultado<List<GenericList>>.Successfull(base.MapToGenericList(await _service.GetDepartments()));
    }
}