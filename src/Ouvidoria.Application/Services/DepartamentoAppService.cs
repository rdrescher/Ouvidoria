using AutoMapper;
using Ouvidoria.Application.DTOs;
using Ouvidoria.Application.Interfaces;
using Ouvidoria.Domain.Models;

namespace Ouvidoria.Application.Services
{
    public class DepartamentoAppService : EntityAppService<Departamento, DepartamentoDTO>, IDepartamentoAppService
    {
        public DepartamentoAppService(IMapper map) : base(map)
        { }
    }
}