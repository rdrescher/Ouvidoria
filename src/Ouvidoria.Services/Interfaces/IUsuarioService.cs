using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Ouvidoria.Domain.Models;

namespace Ouvidoria.Services.Interfaces
{
    public interface IUsuarioService : IDisposable
    {
        Task<List<Usuario>> GetUsers();
    }
}