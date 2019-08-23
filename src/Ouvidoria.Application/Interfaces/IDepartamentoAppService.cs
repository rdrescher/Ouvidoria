using System.Collections.Generic;
using System.Threading.Tasks;
using Ouvidoria.Application.ViewModel;
using Ouvidoria.Application.Utils;
using Ouvidoria.Domain.Models;

namespace Ouvidoria.Application.Interfaces
{
    public interface IDepartamentoAppService : IEntityAppService<Departamento, DepartamentoViewModel>
    {
        Task<Resultado<List<DepartamentoViewModel>>> GetDepartments();
        Task<Resultado<DepartamentoViewModel>> Create(CadastroDepartamentoViewModel cadastroDepartamentoViewModel);
        Task<Resultado> Delete(int id);
        Task<Resultado<DepartamentoViewModel>> Update(AtualizacaoDepartamentoViewModel cadastroDepartamentoViewModel);
        Task<Resultado<List<GenericList>>> GetGenericList();
    }
}