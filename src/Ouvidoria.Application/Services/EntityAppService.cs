using Ouvidoria.Application.Interfaces;
using Ouvidoria.Application.DTO;
using Ouvidoria.Domain.Models;
using AutoMapper;
using System.Collections.Generic;

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

        public List<TEntity> MapToDomain(List<TEntityDTO> entityDTO) =>
            this.Mapper.Map<List<TEntity>>(entityDTO);

        public List<TEntityDTO> MapToDTO(List<TEntity> entity) =>
            this.Mapper.Map<List<TEntityDTO>>(entity);

        public List<GenericList> MapToGenericList(List<TEntity> entity) =>
            this.Mapper.Map<List<GenericList>>(entity);
    }
}