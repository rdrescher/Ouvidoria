using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;

namespace Ouvidoria.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public abstract class BaseController : ControllerBase
    {
        public BaseController()
        { }
    }
}
