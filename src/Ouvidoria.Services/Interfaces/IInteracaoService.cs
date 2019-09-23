using System;
using System.Threading.Tasks;
using Ouvidoria.Domain.Models;

namespace Ouvidoria.Services.Interfaces
{
    public interface IInteracaoService : IDisposable
    {
        Task Create(Interacao reply);
    }
}