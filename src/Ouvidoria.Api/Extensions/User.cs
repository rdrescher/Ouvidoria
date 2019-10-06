using Microsoft.AspNetCore.Http;
using Ouvidoria.Application.Interfaces;
using System.Collections.Generic;
using System.Security.Claims;

namespace Ouvidoria.Api.Extensions
{
    public class User : IUser
    {
        private readonly IHttpContextAccessor _accessor;

        public User(IHttpContextAccessor accessor) => _accessor = accessor;
        public string Name => _accessor.HttpContext.User.Identity.Name;

        public IEnumerable<Claim> GetClaims() =>
            _accessor.HttpContext.User.Claims;

        public string GetEmail() =>
            IsAuthenticated()
                ? _accessor.HttpContext.User.GetUserEmail()
                : "";

        public int GetId() =>
            IsAuthenticated()
                ? int.Parse(_accessor.HttpContext.User.GetUserId())
                : 0;

        public bool IsAuthenticated() =>
            _accessor.HttpContext.User.Identity.IsAuthenticated;
    }
}