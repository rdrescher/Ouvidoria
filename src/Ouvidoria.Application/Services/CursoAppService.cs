using AutoMapper;
using Ouvidoria.Application.DTOs;
using Ouvidoria.Application.Interfaces;
using Ouvidoria.Domain.Models;

namespace Ouvidoria.Application.Services
{
    public class CursoAppService : EntityAppService<Curso, CursoDTO>, ICursoAppService
    {
        public CursoAppService(IMapper map) : base(map)
        { }
    }
}