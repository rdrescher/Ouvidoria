using System.Collections.Generic;
using System.Threading.Tasks;
using Ouvidoria.Application.DTOs;
using Ouvidoria.Application.Utils;
using Ouvidoria.Domain.Models;

namespace Ouvidoria.Application.Interfaces
{
    public interface IDepartamentoAppService : IEntityAppService<Departamento, DepartamentoDTO>
    {
        Task<Resultado<List<DepartamentoDTO>>> GetDepartments();
        Task<Resultado<DepartamentoDTO>> Create(CadastroDepartamentoDTO cadastroDepartamentoDTO);
        Task<Resultado> Delete(int id);
        Task<Resultado<DepartamentoDTO>> Update(CadastroDepartamentoDTO cadastroDepartamentoDTO);
    }
}