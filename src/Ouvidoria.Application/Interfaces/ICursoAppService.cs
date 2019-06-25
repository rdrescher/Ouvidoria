using System.Collections.Generic;
using System.Threading.Tasks;
using Ouvidoria.Application.DTOs;
using Ouvidoria.Application.Utils;
using Ouvidoria.Domain.Models;

namespace Ouvidoria.Application.Interfaces
{
    public interface ICursoAppService : IEntityAppService<Curso, CursoDTO>
    {
        Task<Resultado<List<CursoDTO>>> GetClasses();
        Task<Resultado<CursoDTO>> Update(CursoDTO cursoDTO);
        Task<Resultado<CursoDTO>> Create(CursoDTO cursoDTO);
        Task<Resultado> Delete(int id);
    }
}