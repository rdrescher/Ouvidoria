using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Ouvidoria.Domain.Models;

namespace Ouvidoria.Services.Interfaces
{
    public interface IUsuarioService : IDisposable
    {
        Task<List<Usuario>> GetUsers();
        Task<Usuario> GetUserById(int id);
        Task Create(Usuario usuario);
        Task Update(Usuario usuario);
    }
}