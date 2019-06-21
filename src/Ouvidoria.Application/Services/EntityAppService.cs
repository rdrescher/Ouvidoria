using Ouvidoria.Application.Interfaces;
using Ouvidoria.Application.DTOs;
using Ouvidoria.Domain.Models;
using AutoMapper;

namespace Ouvidoria.Application.Services
{
    public abstract class EntityAppService<TEntity, TEntityDTO> : IEntityAppService<TEntity, TEntityDTO> where TEntity : Entity where TEntityDTO : EntityDTO
    {
        protected readonly IMapper Mapper;
        public EntityAppService(IMapper map)
        {
            this.Mapper = map;
        }

        public TEntity MapToDomain(TEntityDTO entityDTO) =>
            this.Mapper.Map<TEntity>(entityDTO);

        public TEntityDTO MapToDTO(TEntity entity) =>
            this.Mapper.Map<TEntityDTO>(entity);
    }
}