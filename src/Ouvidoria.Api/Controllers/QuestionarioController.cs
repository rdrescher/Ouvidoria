using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Ouvidoria.Application.Interfaces;
using Ouvidoria.Application.Utils;
using Ouvidoria.Application.ViewModel;

namespace Ouvidoria.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class QuestionarioController : BaseController
    {
        private readonly IQuestionarioAppService _service;
        private readonly IQuestionarioRespostaAppService _questionarioRespostaService;
        public QuestionarioController(
            IQuestionarioAppService service, 
            IQuestionarioRespostaAppService questionarioRespostaService
        )
        {
            _service = service;
            _questionarioRespostaService = questionarioRespostaService;
        }

        [Authorize(policy: "Administrador")]
        [HttpGet]
        public async Task<ActionResult<Resultado<List<QuestionarioDetailViewModel>>>> Get() =>
            Ok(await _service.GetQuizzes());

        [Authorize]
        [HttpGet("{id:int}")]
        public async Task<ActionResult<Resultado<QuestionarioViewModel>>> Get(int id) =>
            Ok(await _service.GetById(id));

        [Authorize]
        [HttpGet("[action]")]
        public async Task<ActionResult<Resultado<List<QuestionarioPreviewViewModel>>>> GetPreviewList()
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            return Ok(await _service.GetPreviewList(userId));
        }

        [Authorize(policy: "Administrador")]
        [HttpPost]
        public async Task<ActionResult<Resultado>> Post(CadastroQuestionarioViewModel questionario)
        {
            if (!ModelState.IsValid) return Ok(Resultado.Failed("Dados inválidos"));
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            return Ok(await _service.Create(questionario, userId));
        }

        [AllowAnonymous]
        [HttpPost("[action]")]
        public async Task<ActionResult<Resultado>> Reply(CadastroQuestionarioRespostaViewModel resposta)
        {
            if (!ModelState.IsValid) return Ok(Resultado.Failed("Dados inválidos"));
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            return Ok(await _questionarioRespostaService.Create(resposta, userId));
        }

        public async Task<ActionResult<Resultado>> IsUserAbleToAnswer(int idQuestionario)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            return Ok(await _questionarioRespostaService.IsUserAbleToAnswer(idQuestionario, userId));
        }

    }
}