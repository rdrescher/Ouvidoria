using Ouvidoria.Application.DTO;
using Ouvidoria.Domain.Models;

namespace Ouvidoria.Application.Interfaces
{
    public interface IEntityAppService<TEntity, TEntityDTO> where TEntity : Entity where TEntityDTO : EntityDTO
    {
         TEntity MapToDomain(TEntityDTO entityDTO);
         TEntityDTO MapToDTO(TEntity entity);
    }
}