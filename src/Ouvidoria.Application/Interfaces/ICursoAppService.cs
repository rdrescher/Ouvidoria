using System.Collections.Generic;
using System.Threading.Tasks;
using Ouvidoria.Application.ViewModel;
using Ouvidoria.Application.Utils;
using Ouvidoria.Domain.Models;

namespace Ouvidoria.Application.Interfaces
{
    public interface ICursoAppService : IEntityAppService<Curso, CursoViewModel>
    {
        Task<Resultado<List<CursoViewModel>>> GetClasses();
        Task<Resultado<CursoViewModel>> Update(CursoViewModel cursoViewModel);
        Task<Resultado<CursoViewModel>> Create(CursoViewModel cursoViewModel);
        Task<Resultado> Delete(int id);
        Task<Resultado<List<GenericList>>> GetGenericList();
    }
}