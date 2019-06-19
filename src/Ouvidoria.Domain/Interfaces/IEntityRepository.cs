using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Ouvidoria.Domain.Core.Models;

namespace Ouvidoria.Domain.Interfaces
{
    public interface IEntityRepository<TEntity> : IDisposable where TEntity : Entity
    {
        Task Create(TEntity entity);
        Task Delete(Guid id);
        Task<List<TEntity>> GetAll();
        Task<TEntity> GetById(int id);
        Task<int> SaveChanges();
        Task<IEnumerable<TEntity>> Search(Expression<Func<TEntity, bool>> predicate);
        Task Update(TEntity entity);
    }
}