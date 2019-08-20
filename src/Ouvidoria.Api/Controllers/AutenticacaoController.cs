using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Ouvidoria.Application.DTO;
using Ouvidoria.Application.Interfaces;
using Ouvidoria.Application.Utils;
using Ouvidoria.CrossCutting.Identity.Models;
using Ouvidoria.Domain.Interfaces;

namespace Ouvidoria.Api.Controllers
{
    [Route("api/[controller]")]
    public class AutenticacaoController : BaseController
    {
        private readonly IMapper _map;
        private readonly INotificador _notificador;
        private readonly SignInManager<AspNetUser> _signInManager;
        private readonly UserManager<AspNetUser> _userManager;
        private readonly IUsuarioAppService _usuarioService;
        public AutenticacaoController(
            IMapper map,
            INotificador notificador,
            SignInManager<AspNetUser> signInManager,
            UserManager<AspNetUser> userManager,
            IUsuarioAppService usuarioService
        )
        {
            this._userManager = userManager;
            this._signInManager = signInManager;
            this._map = map;
            this._usuarioService = usuarioService;
            this._notificador = notificador;
        }

        [HttpPost("[action]")]
        public async Task<ActionResult<Resultado<CadastroUsuarioDTO>>> Cadastrar(CadastroUsuarioDTO cadastroUsuario)
        {
            if (!ModelState.IsValid)
                return Ok(Resultado.Failed("Dados incorretos"));
            if (!await _usuarioService.IsValidUser(cadastroUsuario))
                return Ok(Resultado.Failed(_notificador.GetNotifications().Select(x => x.Mensagem).ToArray()));

            var user = _map.Map<AspNetUser>(cadastroUsuario);

            var result = await _userManager.CreateAsync(user, cadastroUsuario.senha);

            if (result.Succeeded)
            {
                await _signInManager.SignInAsync(user, false);
                return Ok(Resultado<CadastroUsuarioDTO>.Successfull(cadastroUsuario));
            }
            return Ok(Resultado.Failed(GetRegisterErrors(result.Errors).ToArray()));
        }

        [HttpPost("[action]")]
        public async Task<ActionResult<Resultado<LoginDTO>>> Login(LoginDTO login)
        {
            if (!ModelState.IsValid)
                return Ok(Resultado.Failed("Dados Incorretos"));

            var result = await _signInManager.PasswordSignInAsync(login.Email, login.Senha, false, true);

            if (!await _usuarioService.IsActiveUser(login.Email))
                return Ok(Resultado.Failed("Usuário Inativo"));

            if (result.Succeeded)
                return Ok(Resultado<LoginDTO>.Successfull(login));

            if (result.IsLockedOut)
                return Ok(Resultado.Failed("Usuário temporáriamente bloqueado por tentativas inválidas"));

            return Ok(Resultado.Failed("Usuário ou Senha incorretos"));
        }

        private IEnumerable<string> GetRegisterErrors(IEnumerable<IdentityError> errors)
        {
            foreach (var item in errors)
                yield return item.Description;
        }
    }
}