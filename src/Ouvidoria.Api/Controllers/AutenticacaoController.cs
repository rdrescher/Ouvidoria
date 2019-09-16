using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Ouvidoria.Api.Extensions;
using Ouvidoria.Application.ViewModel;
using Ouvidoria.Application.Interfaces;
using Ouvidoria.Application.Utils;
using Ouvidoria.CrossCutting.Identity.Models;
using Ouvidoria.Domain.Interfaces;

namespace Ouvidoria.Api.Controllers
{
    [ApiController]
    public class AutenticacaoController : BaseController
    {
        private readonly IMapper _map;
        private readonly INotificador _notificador;
        private readonly JwtSettings _jwtSettings;
        private readonly SignInManager<AspNetUser> _signInManager;
        private readonly UserManager<AspNetUser> _userManager;
        private readonly IUsuarioAppService _usuarioService;

        public AutenticacaoController(
            IMapper map,
            INotificador notificador,
            SignInManager<AspNetUser> signInManager,
            UserManager<AspNetUser> userManager,
            IUsuarioAppService usuarioService,
            IOptions<JwtSettings> jwtSettings
        )
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _map = map;
            _usuarioService = usuarioService;
            _notificador = notificador;
            _jwtSettings = jwtSettings.Value;
        }

        [HttpGet("[action]")]
        [Authorize]
        public ActionResult<Resultado> CheckToken() => Ok(Resultado.Successfull());

        [AllowAnonymous]
        [HttpPost("[action]")]
        public async Task<ActionResult<Resultado<LoginResponseViewModel>>> Cadastrar(CadastroUsuarioViewModel cadastroUsuario)
        {
            if (User.Identity.IsAuthenticated) return Ok(Resultado.Failed());
            if (!ModelState.IsValid)
                return Ok(Resultado.Failed("Dados incorretos"));
            if (!await _usuarioService.IsValidUser(cadastroUsuario))
                return Ok(Resultado.Failed(_notificador.GetNotifications().Select(x => x.Mensagem).ToArray()));

            var user = _map.Map<AspNetUser>(cadastroUsuario);

            var result = await _userManager.CreateAsync(user, cadastroUsuario.senha);

            if (result.Succeeded)
            {
                await _signInManager.SignInAsync(user, false);
                return Ok(Resultado<LoginResponseViewModel>.Successfull(await GenerateJWT(cadastroUsuario.email)));
            }
            return Ok(Resultado.Failed(GetRegisterErrors(result.Errors).ToArray()));
        }

        [AllowAnonymous]
        [HttpPost("[action]")]
        public async Task<ActionResult<Resultado<LoginResponseViewModel>>> Login(LoginViewModel login)
        {
            if (User.Identity.IsAuthenticated) return Ok(Resultado.Failed());
            if (!ModelState.IsValid)
                return Ok(Resultado.Failed("Dados Incorretos"));

            var result = await _signInManager.PasswordSignInAsync(login.Email, login.Senha, false, true);

            if (result.Succeeded)
            {
                if (!await _usuarioService.IsActiveUser(login.Email))
                    return Ok(Resultado.Failed("Usuário inativo, entre em contato com ouvidoria@faculdadeam.edu.br para verificar sobre seu acesso"));

                return Ok(Resultado<LoginResponseViewModel>.Successfull(await GenerateJWT(login.Email)));
            }

            if (result.IsLockedOut)
                return Ok(Resultado.Failed("Usuário temporáriamente bloqueado por tentativas inválidas"));

            return Ok(Resultado.Failed("Usuário ou Senha incorretos"));
        }

        private IEnumerable<string> GetRegisterErrors(IEnumerable<IdentityError> errors)
        {
            foreach (var item in errors)
                yield return item.Description;
        }

        private async Task<LoginResponseViewModel> GenerateJWT(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            var claims = await _userManager.GetClaimsAsync(user);

            claims.Add(new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()));
            claims.Add(new Claim(JwtRegisteredClaimNames.Email, user.Email));
            claims.Add(new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()));
            claims.Add(new Claim(JwtRegisteredClaimNames.Nbf, ToUnixEpochDate(DateTime.UtcNow).ToString()));
            claims.Add(new Claim(JwtRegisteredClaimNames.Iat, ToUnixEpochDate(DateTime.UtcNow).ToString(), ClaimValueTypes.Integer64));

            var identityClaims = new ClaimsIdentity();
            identityClaims.AddClaims(claims);

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_jwtSettings.Secret);
            var token = tokenHandler.CreateToken(new SecurityTokenDescriptor
            {
                Issuer = _jwtSettings.Issuer,
                Audience = _jwtSettings.ValidIn,
                Subject = identityClaims,
                Expires = DateTime.UtcNow.AddHours(_jwtSettings.ExpirationTime),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            });

            var encodeViewModelken = tokenHandler.WriteToken(token);

            var response = new LoginResponseViewModel
            {
                AccessToken = encodeViewModelken,
                ExpiresIn = TimeSpan.FromHours(_jwtSettings.ExpirationTime).TotalSeconds,
                User = new UserTokenViewModel
                {
                    Id = user.Id,
                    Email = user.Email,
                    Name = user.Nome
                }
            };

            return response;
        }

        private static long ToUnixEpochDate(DateTime date)
            => (long)Math.Round((date.ToUniversalTime() - new DateTimeOffset(1970, 1, 1, 0, 0, 0, TimeSpan.Zero)).TotalSeconds);
    }
}