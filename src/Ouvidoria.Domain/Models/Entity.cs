using System;

namespace Ouvidoria.Domain.Models
{
    public abstract class Entity
    {
        public virtual int Id { get; set; }

        public virtual DateTime DataAtualizacao { get; protected set; }

        public virtual DateTime DataInsercao { get; protected set; }

        public void SetUpdatedDate() =>
            this.DataAtualizacao = DateTime.Now;
        
    }
}
