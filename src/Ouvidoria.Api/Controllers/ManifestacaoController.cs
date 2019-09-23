using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Ouvidoria.Application.Interfaces;
using Ouvidoria.Application.Utils;
using Ouvidoria.Application.ViewModel;

namespace Ouvidoria.Api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class ManifestacaoController : BaseController
    {
        private IManifestacaoAppService _service;

        public ManifestacaoController(IManifestacaoAppService service)
        {
            _service = service;
        }

        [HttpPost]
        public async Task<ActionResult<Resultado>> Post(CadastroManifestacaoViewModel manifestacao)
        {
            if(!ModelState.IsValid) return BadRequest();
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            return Ok(await _service.Create(manifestacao, userId));
        }

        [HttpPost("[action]")]
        public async Task<ActionResult<Resultado>> Reply(CadastroInteracaoViewModel resposta)
        {
            if(!ModelState.IsValid) return BadRequest();
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            return Ok(await _service.Reply(resposta, userId));
        }
    }
}