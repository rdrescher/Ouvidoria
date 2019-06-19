using System;

namespace Ouvidoria.Domain.Core.Models
{
    public abstract class Entity
    {
        public virtual int Id { get; protected set; }

        public virtual DateTime DataAtualizacao { get; protected set; }

        public virtual DateTime DataInsercao { get; protected set; }
    }
}
