using AutoMapper;
using Ouvidoria.Application.DTOs;
using Ouvidoria.Domain.Models;

namespace Ouvidoria.Application.Services
{
    public class DepartamentoAppService : EntityAppService<Departamento, DepartamentoDTO>
    {
        public DepartamentoAppService(IMapper map) : base(map)
        { }
    }
}