using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Ouvidoria.Application.DTO;
using Ouvidoria.Application.Enums;
using Ouvidoria.Application.Interfaces;
using Ouvidoria.Application.Utils;
using Ouvidoria.CrossCutting.Identity.Models;

namespace Ouvidoria.Api.Controllers
{
    [Authorize(policy: "Administrador")]
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : BaseController
    {
        private readonly IUsuarioAppService _service;
        private readonly UserManager<AspNetUser> _userManager;
        public UsuarioController(
            IUsuarioAppService service,
            UserManager<AspNetUser> userManager)
        {
            _service = service;
            _userManager = userManager;
        }

        [HttpGet]
        public async Task<ActionResult<Resultado<List<UsuarioDTO>>>> Get() =>
            Ok(await _service.GetUsers());

        [HttpPut("{id:int}")]
        public async Task<ActionResult<Resultado<UsuarioDTO>>> Put(int id, AtualizacaoUsuarioDTO atualizacaoUsuario)
        {
            if (id != atualizacaoUsuario.id) return BadRequest();
            if (!ModelState.IsValid)
                return Ok(Resultado<CursoDTO>.Failed(ModelState.Values.Select(x => x.Errors).ToString()));

            var result = await _service.Update(atualizacaoUsuario);
            if (result.Success)
            {
                var user = await _userManager.FindByIdAsync(result.Data.id.ToString());
                var claims = await _userManager.GetClaimsAsync(user);

                if (claims.Count > 0 && atualizacaoUsuario.UsuarioPerfil != UsuarioPerfil.Administrador)
                {
                    await _userManager.RemoveClaimsAsync(user, claims);
                }
                else if (claims.Count == 0 && atualizacaoUsuario.UsuarioPerfil == UsuarioPerfil.Administrador)
                {
                    var claim = new Claim(UsuarioPerfil.Administrador.ToString(),
                                          UsuarioPerfil.Administrador.ToString());
                    await _userManager.AddClaimAsync(user, claim);
                }
            }
            return Ok(result);
        }

        [HttpGet("[action]")]
        public async Task<ActionResult<Resultado<List<GenericList>>>> GetGenericList() =>
            Ok(await _service.GetGenericList());
    }
}
