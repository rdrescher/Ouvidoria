using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Ouvidoria.Application.DTO;
using Ouvidoria.Application.Interfaces;
using Ouvidoria.Application.Utils;
using Ouvidoria.Domain.Interfaces;
using Ouvidoria.Domain.Models;
using Ouvidoria.Services.Interfaces;

namespace Ouvidoria.Application.Services
{
    public class CursoAppService : EntityAppService<Curso, CursoDTO>, ICursoAppService
    {
        private readonly ICursoService Service;
        private readonly INotificador Notificador;
        public CursoAppService(IMapper map, ICursoService service, INotificador notificador) : base(map)
        {
            this.Notificador = notificador;
            this.Service = service;
        }

        public async Task<Resultado<CursoDTO>> Create(CursoDTO cursoDTO)
        {
            var curso = MapToDomain(cursoDTO);
            await Service.Create(curso);

            cursoDTO = MapToDTO(curso);

            return Notificador.HasNotification() ?
                Resultado<CursoDTO>.Failed(Notificador.GetNotifications().Select(x => x.Mensagem).ToArray()) :
                Resultado<CursoDTO>.Successfull(cursoDTO);
        }

        public async Task<Resultado> Delete(int id)
        {
            await Service.Delete(id);
            return Notificador.HasNotification() ?
                Resultado.Failed(Notificador.GetNotifications().Select(x => x.Mensagem).ToArray()) :
                Resultado.Successfull();
        }

        public async Task<Resultado<List<CursoDTO>>> GetClasses() =>
            Resultado<List<CursoDTO>>.Successfull(base.MapToDTO(await Service.GetClasses()));


        public async Task<Resultado<CursoDTO>> Update(CursoDTO cursoDTO)
        {
            var curso = MapToDomain(cursoDTO);

            await Service.Update(curso);

            var cursosDTO = MapToDTO(curso);

            return Notificador.HasNotification() ?
                Resultado<CursoDTO>.Failed(Notificador.GetNotifications().Select(x => x.Mensagem).ToArray()) :
                Resultado<CursoDTO>.Successfull(cursoDTO);
        }
    }
}