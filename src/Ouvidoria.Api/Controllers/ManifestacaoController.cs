using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Ouvidoria.Application.Enums;
using Ouvidoria.Application.Interfaces;
using Ouvidoria.Application.Utils;
using Ouvidoria.Application.ViewModel;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Ouvidoria.Api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class ManifestacaoController : BaseController
    {
        private readonly IManifestacaoAppService _service;

        public ManifestacaoController(IManifestacaoAppService service, IUser user) : base(user)
        {
            _service = service;
        }

        [HttpPost]
        public async Task<ActionResult<Resultado>> Post(CadastroManifestacaoViewModel manifestacao)
        {
            if (!ModelState.IsValid) return BadRequest();
            return Ok(await _service.Create(manifestacao));
        }

        [HttpPost("[action]")]
        public async Task<ActionResult<Resultado>> Reply(CadastroInteracaoViewModel resposta)
        {
            if (!ModelState.IsValid) return BadRequest();
            return Ok(await _service.Reply(resposta));
        }

        [HttpGet("[action]")]
        public async Task<ActionResult<Resultado<List<ManifestacaoPeviewViewModel>>>> GetPersonalManifestations() =>
            Ok(await _service.GetByUser());


        [HttpGet("[action]/{tipo:int}")]
        public async Task<ActionResult<Resultado<List<ManifestacaoPeviewViewModel>>>> GetPersonalManifestations(TipoManifestacao tipo) =>
            Ok(await _service.GetByUser(tipo));

        [HttpGet]
        [Authorize(policy: "Administrador")]
        public async Task<ActionResult<Resultado<List<ManifestacaoPeviewViewModel>>>> Get() =>
            Ok(await _service.GetAll());
        
        [HttpGet("{tipo:int}")]
        [Authorize(policy: "Administrador")]
        public async Task<ActionResult<Resultado<List<ManifestacaoPeviewViewModel>>>> Get(TipoManifestacao tipo) =>
            Ok(await _service.GetAll(tipo));

        [HttpGet("[action]/{id:int}")]
        public async Task<ActionResult<Resultado<ManifestacaoViewModel>>> GetDetails(int id) =>
            Ok(await _service.GetById(id));
    }
}