using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Ouvidoria.Application.ViewModel;
using Ouvidoria.Application.Interfaces;
using Ouvidoria.Application.Utils;

namespace Ouvidoria.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CursoController : BaseController
    {
        private readonly ICursoAppService _service;
        public CursoController(ICursoAppService service)
        {
            this._service = service;
        }

        [Authorize(policy: "Administrador")]
        [HttpGet]
        public async Task<ActionResult<Resultado<List<CursoViewModel>>>> Get() =>
            Ok(await _service.GetClasses());

        [HttpPost]
        public async Task<ActionResult<Resultado<CursoViewModel>>> Post(CursoViewModel cursoViewModel) =>
            ModelState.IsValid ?
                Ok(await _service.Create(cursoViewModel)) :
                Ok(Resultado<CursoViewModel>.Failed(ModelState.Values.Select(x => x.Errors).FirstOrDefault().ToString()));

        [Authorize(policy: "Administrador")]
        [HttpPut("{id:int}")]
        public async Task<ActionResult<Resultado<CursoViewModel>>> Put(int id, CursoViewModel cursoViewModel)
        {
            if (id != cursoViewModel.id) return BadRequest();
            return ModelState.IsValid ?
                Ok(await _service.Update(cursoViewModel)) :
                Ok(Resultado<CursoViewModel>.Failed(ModelState.Values.Select(x => x.Errors).FirstOrDefault().ToString()));
        }

        [Authorize(policy: "Administrador")]
        [HttpDelete("{id:int}")]
        public async Task<ActionResult<Resultado>> Delete(int id) =>
            Ok(await _service.Delete(id));

        [AllowAnonymous]
        [HttpGet("[action]")]
        public async Task<ActionResult<Resultado<List<GenericList>>>> GetGenericList() =>
            Ok(await _service.GetGenericList());
    }
}
