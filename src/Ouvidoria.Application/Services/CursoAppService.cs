using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Ouvidoria.Application.DTOs;
using Ouvidoria.Application.Interfaces;
using Ouvidoria.Application.Utils;
using Ouvidoria.Domain.Models;
using Ouvidoria.Services.Interfaces;

namespace Ouvidoria.Application.Services
{
    public class CursoAppService : EntityAppService<Curso, CursoDTO>, ICursoAppService
    {
        private readonly ICursoService Service;
        public CursoAppService(IMapper map, ICursoService service) : base(map)
        { 
            this.Service = service;
        }
            
        public async Task<Resultado<List<CursoDTO>>> GetClasses()
        {
            var cursos = base.Mapper.Map<List<CursoDTO>>(await Service.GetClasses());

            if(cursos == null || cursos.Count == 0)
                return Resultado<List<CursoDTO>>.Failed("Nenhum curso encontrado");

            var cursosDTO = base.Mapper.Map<List<CursoDTO>>(cursos);
            return Resultado<List<CursoDTO>>.Successfull(cursosDTO);
        }

        public async Task<Resultado<CursoDTO>> Update(CursoDTO cursoDTO)
        {
            var curso = MapToDomain(cursoDTO);

            curso = await Service.Update(curso);

            var cursosDTO = MapToDTO(curso);
            return Resultado<CursoDTO>.Successfull(cursosDTO);
        }
    }
}