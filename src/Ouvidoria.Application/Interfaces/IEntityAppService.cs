using Ouvidoria.Application.ViewModel;
using Ouvidoria.Domain.Models;

namespace Ouvidoria.Application.Interfaces
{
    public interface IEntityAppService<TEntity, TEntityViewModel> where TEntity : Entity where TEntityViewModel : EntityViewModel
    {
         TEntity MapToDomain(TEntityViewModel entityViewModel);
         TEntityViewModel MapToViewModel(TEntity entity);
    }
}