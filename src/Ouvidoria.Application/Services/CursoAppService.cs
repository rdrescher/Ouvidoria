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
        private readonly ICursoService _service;
        public CursoAppService(
            IMapper map, 
            INotificador notificador,
            ICursoService service
        ) : base(map, notificador)
        {
            _service = service;
        }

        public async Task<Resultado<CursoViewModel>> Create(CursoViewModel cursoViewModel)
        {
            var curso = MapToDomain(cursoViewModel);
            await _service.Create(curso);

            cursoViewModel = MapToViewModel(curso);

            return Notificador.HasNotification()
                ? Resultado<CursoViewModel>.Failed(Notificador.GetNotificationsMessages())
                : Resultado<CursoViewModel>.Successfull(cursoViewModel);
        }

        public async Task<Resultado> Delete(int id)
        {
            await _service.Delete(id);
            return Notificador.HasNotification()
                ? Resultado<CursoViewModel>.Failed(Notificador.GetNotificationsMessages())
                : Resultado.Successfull();
        }

        public async Task<Resultado<List<CursoViewModel>>> GetClasses() =>
            Resultado<List<CursoViewModel>>.Successfull(base.MapToViewModel(await _service.GetClasses()));

        public async Task<Resultado<List<GenericList>>> GetGenericList() =>
            Resultado<List<GenericList>>.Successfull(base.MapToGenericList(await _service.GetClasses()));

        public async Task<Resultado<CursoViewModel>> Update(CursoViewModel cursoViewModel)
        {
            var curso = MapToDomain(cursoViewModel);

            await _service.Update(curso);

            var cursosViewModel = MapToViewModel(curso);

            return Notificador.HasNotification()
                ? Resultado<CursoViewModel>.Failed(Notificador.GetNotificationsMessages())
                : Resultado<CursoViewModel>.Successfull(cursosViewModel);
        }
    }
}