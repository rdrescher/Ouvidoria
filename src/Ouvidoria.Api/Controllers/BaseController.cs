using Microsoft.AspNetCore.Mvc;
using Ouvidoria.Application.Interfaces;

namespace Ouvidoria.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public abstract class BaseController : ControllerBase
    {
        public readonly IUser ApplicationUser;

        protected BaseController(IUser user) => ApplicationUser = user;
    }
}
