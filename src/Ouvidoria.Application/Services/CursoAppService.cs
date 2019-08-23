using System;
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
    public class CursoAppService : EntityAppService<Curso, CursoViewModel>, ICursoAppService
    {
        private readonly ICursoService Service;
        private readonly INotificador Notificador;
        public CursoAppService(IMapper map, ICursoService service, INotificador notificador) : base(map)
        {
            this.Notificador = notificador;
            this.Service = service;
        }

        public async Task<Resultado<CursoViewModel>> Create(CursoViewModel cursoViewModel)
        {
            var curso = MapToDomain(cursoViewModel);
            await Service.Create(curso);

            cursoViewModel = MapToViewModel(curso);

            return Notificador.HasNotification() ?
                Resultado<CursoViewModel>.Failed(Notificador.GetNotifications().Select(x => x.Mensagem).ToArray()) :
                Resultado<CursoViewModel>.Successfull(cursoViewModel);
        }

        public async Task<Resultado> Delete(int id)
        {
            await Service.Delete(id);
            return Notificador.HasNotification() ?
                Resultado.Failed(Notificador.GetNotifications().Select(x => x.Mensagem).ToArray()) :
                Resultado.Successfull();
        }

        public async Task<Resultado<List<CursoViewModel>>> GetClasses() =>
            Resultado<List<CursoViewModel>>.Successfull(base.MapToViewModel(await Service.GetClasses()));

        public async Task<Resultado<List<GenericList>>> GetGenericList() =>
            Resultado<List<GenericList>>.Successfull(base.MapToGenericList(await Service.GetClasses()));

        public async Task<Resultado<CursoViewModel>> Update(CursoViewModel cursoViewModel)
        {
            var curso = MapToDomain(cursoViewModel);

            await Service.Update(curso);

            var cursosViewModel = MapToViewModel(curso);

            return Notificador.HasNotification() ?
                Resultado<CursoViewModel>.Failed(Notificador.GetNotifications().Select(x => x.Mensagem).ToArray()) :
                Resultado<CursoViewModel>.Successfull(cursoViewModel);
        }
    }
}