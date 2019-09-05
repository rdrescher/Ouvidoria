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
        public QuestionarioController(IQuestionarioAppService service)
        {
            _service = service;
        }

        [Authorize(policy: "Administrador")]
        [HttpGet]
        public async Task<ActionResult<Resultado<List<QuestionarioDetailViewModel>>>> Get() =>
            Ok(await _service.GetQuizzes());

        [Authorize(policy: "Administrador")]
        [HttpGet("[action]")]
        public async Task<ActionResult<Resultado<List<QuestionarioPreviewViewModel>>>> GetPreviewList()
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            return Ok(await _service.GetPreviewList(userId));
        }

        [Authorize(policy: "Administrador")]
        [HttpPost]
        public async Task<ActionResult<Resultado<QuestionarioViewModel>>> Post(CadastroQuestionarioViewModel questionario)
        {
            if (!ModelState.IsValid) return Ok(Resultado.Failed("Dados inválidos"));
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            return Ok(await _service.Create(questionario, userId));
        }

    }
}