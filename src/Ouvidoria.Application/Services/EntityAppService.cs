using Ouvidoria.Application.Interfaces;
using Ouvidoria.Application.ViewModel;
using Ouvidoria.Domain.Models;
using AutoMapper;
using System.Collections.Generic;
using Ouvidoria.Domain.Interfaces;

namespace Ouvidoria.Application.Services
{
    public abstract class EntityAppService<TEntity, TEntityViewModel> : IEntityAppService<TEntity, TEntityViewModel> where TEntity : Entity where TEntityViewModel : EntityViewModel
    {
        protected readonly IMapper Mapper;
        protected readonly INotificador Notificador;
        protected EntityAppService(IMapper map, INotificador notificador)
        {
            Mapper = map;
            Notificador = notificador;
        }

        public TEntity MapToDomain(TEntityViewModel entityViewModel) =>
            this.Mapper.Map<TEntity>(entityViewModel);

        public TEntityViewModel MapToViewModel(TEntity entity) =>
            this.Mapper.Map<TEntityViewModel>(entity);

        public List<TEntity> MapToDomain(List<TEntityViewModel> entityViewModel) =>
            this.Mapper.Map<List<TEntity>>(entityViewModel);

        public List<TEntityViewModel> MapToViewModel(List<TEntity> entity) =>
            this.Mapper.Map<List<TEntityViewModel>>(entity);

        public List<GenericList> MapToGenericList(List<TEntity> entity) =>
            this.Mapper.Map<List<GenericList>>(entity);
    }
}