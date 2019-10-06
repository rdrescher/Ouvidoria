using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Ouvidoria.Application.Enums;
using Ouvidoria.Application.Interfaces;
using Ouvidoria.Application.Utils;
using Ouvidoria.Application.ViewModel;
using Ouvidoria.CrossCutting.Identity.Models;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Ouvidoria.Api.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class UsuarioController : BaseController
    {
        private readonly IUsuarioAppService _service;
        private readonly UserManager<AspNetUser> _userManager;
        public UsuarioController(
            IUsuarioAppService service,
            UserManager<AspNetUser> userManager,
            IUser user
        ) : base(user)
        {
            _service = service;
            _userManager = userManager;
        }

        [Authorize(policy: "Administrador")]
        [HttpGet]
        public async Task<ActionResult<Resultado<List<UsuarioViewModel>>>> Get() =>
            Ok(await _service.GetUsers());

        [Authorize(policy: "Administrador")]
        [HttpPut("{id:int}")]
        public async Task<ActionResult<Resultado<UsuarioViewModel>>> Put(int id, AtualizacaoUsuarioViewModel atualizacaoUsuario)
        {
            if (id != atualizacaoUsuario.id) return BadRequest();
            if (!ModelState.IsValid)
                return Ok(Resultado<CursoViewModel>.Failed(ModelState.Values.Select(x => x.Errors).ToString()));

            var result = await _service.Update(atualizacaoUsuario);
            if (result.Success)
            {
                var user = await _userManager.FindByIdAsync(result.Data.id.ToString());
                var claims = await _userManager.GetClaimsAsync(user);

                if (claims.Count > 0 && atualizacaoUsuario.UsuarioPerfil == UsuarioPerfil.Usuario)
                {
                    await _userManager.RemoveClaimsAsync(user, claims);
                }
                else if (atualizacaoUsuario.UsuarioPerfil != UsuarioPerfil.Usuario)
                {
                    var claim = new Claim(atualizacaoUsuario.UsuarioPerfil.ToString(),
                                          atualizacaoUsuario.UsuarioPerfil.ToString());

                    if (claims.Count > 0 && !claims.Select(x => x.Type).Contains(claim.Type))
                    {
                        await _userManager.RemoveClaimsAsync(user, claims);
                        await _userManager.AddClaimAsync(user, claim);
                    }
                    else if (claims.Count == 0)
                    {
                        await _userManager.AddClaimAsync(user, claim);
                    }
                }
            }
            return Ok(result);
        }

        [Authorize(policy: "Administrador")]
        [HttpGet("[action]")]
        public async Task<ActionResult<Resultado<List<GenericList>>>> GetGenericList() =>
            Ok(await _service.GetGenericList());
    }
}
