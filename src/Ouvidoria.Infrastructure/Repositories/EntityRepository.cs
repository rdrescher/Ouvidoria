using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Ouvidoria.Domain.Interfaces;
using Ouvidoria.Domain.Models;
using Ouvidoria.Infrastructure.Context;

namespace Ouvidoria.Infrastructure.Repositories
{
    public class EntityRepository<TEntity> : IEntityRepository<TEntity> where TEntity : Entity, new()
    {
        protected readonly OuvidoriaContext Db;
        protected readonly DbSet<TEntity> DbSet;

        public EntityRepository(OuvidoriaContext context)
        {
            Db = context;
            DbSet = Db.Set<TEntity>();
        }
        public virtual async Task Create(TEntity entity)
        {
            DbSet.Add(entity);
            await SaveChanges();
        }

        public virtual async Task Delete(int id)
        {
            DbSet.Remove(new TEntity { Id = id });
            await SaveChanges();
        }

        public virtual async Task<List<TEntity>> GetAll() => 
            await DbSet.ToListAsync();

        public virtual async Task<TEntity> GetById(int id) => 
            await DbSet.FindAsync(id);

        public async Task<int> SaveChanges() => 
            await Db.SaveChangesAsync();

        public async Task<IEnumerable<TEntity>> Search(Expression<Func<TEntity, bool>> predicate) =>
            await DbSet.AsNoTracking().Where(predicate).ToListAsync();

        public virtual async Task Update(TEntity entity)
        {
            DbSet.Update(entity);
            await SaveChanges();
        }

        public void Dispose() => 
            Db?.Dispose();

    }
}