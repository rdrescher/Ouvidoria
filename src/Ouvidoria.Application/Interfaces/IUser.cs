using System.Collections.Generic;
using System.Security.Claims;

namespace Ouvidoria.Application.Interfaces
{
    public interface IUser
    {
        string Name { get; }
        int GetId();
        string GetEmail();
        bool IsAuthenticated();
        IEnumerable<Claim> GetClaims();
    }
}