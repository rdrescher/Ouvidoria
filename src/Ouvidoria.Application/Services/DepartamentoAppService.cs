using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Ouvidoria.Application.DTOs;
using Ouvidoria.Application.Interfaces;
using Ouvidoria.Application.Utils;
using Ouvidoria.Domain.Interfaces;
using Ouvidoria.Domain.Models;
using Ouvidoria.Services.Interfaces;

namespace Ouvidoria.Application.Services
{
    public class DepartamentoAppService : EntityAppService<Departamento, DepartamentoDTO>, IDepartamentoAppService
    {
        private readonly INotificador Notificador;
        private readonly IDepartamentoService Service;
        public DepartamentoAppService(IMapper map, IDepartamentoService service, INotificador notificador) : base(map)
        {
            this.Notificador = notificador;
            this.Service = service;
        }

        public async Task<Resultado<DepartamentoDTO>> Create(CadastroDepartamentoDTO cadastroDepartamentoDTO)
        {
            var Departamento = base.Mapper.Map<Departamento>(cadastroDepartamentoDTO);
            await Service.Create(Departamento);
            var DepartamentoDTO = base.MapToDTO(Departamento);

            return Notificador.HasNotification() ?
                Resultado<DepartamentoDTO>.Failed(Notificador.GetNotifications().Select(x => x.Mensagem).ToArray()) :
                Resultado<DepartamentoDTO>.Successfull(DepartamentoDTO);
        }

        public async Task<Resultado<List<DepartamentoDTO>>> GetDepartments() =>
            Resultado<List<DepartamentoDTO>>.Successfull(base.MapToDTO(await Service.GetDepartments()));

        public async Task<Resultado> Delete(int id)
        {
            await Service.Delete(id);
            return Notificador.HasNotification() ?
                Resultado.Failed(Notificador.GetNotifications().Select(x => x.Mensagem).ToArray()) :
                Resultado.Successfull();
        }
    }
}