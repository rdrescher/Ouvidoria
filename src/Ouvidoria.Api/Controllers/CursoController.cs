using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Ouvidoria.Application.DTO;
using Ouvidoria.Application.Interfaces;
using Ouvidoria.Application.Utils;

namespace Ouvidoria.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CursoController : BaseController
    {
        private readonly ICursoAppService service;
        public CursoController(ICursoAppService service)
        {
            this.service = service;
        }

        [HttpGet]
        public async Task<ActionResult<Resultado<List<CursoDTO>>>> Get() =>
            Ok(await service.GetClasses());

        [HttpPost]
        public async Task<ActionResult<Resultado<CursoDTO>>> Post(CursoDTO cursoDTO) =>
            ModelState.IsValid ?
                Ok(await service.Create(cursoDTO)) :
                Ok(Resultado<CursoDTO>.Failed(ModelState.Values.Select(x => x.Errors).FirstOrDefault().ToString()));

        [HttpPut("{id:int}")]
        public async Task<ActionResult<Resultado<CursoDTO>>> Put(int id, CursoDTO cursoDTO)
        {
            if(id != cursoDTO.id) return BadRequest();
            return ModelState.IsValid ?
                Ok(await service.Update(cursoDTO)) :
                Ok(Resultado<CursoDTO>.Failed(ModelState.Values.Select(x => x.Errors).FirstOrDefault().ToString()));
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult<Resultado>> Delete(int id) =>
            Ok(await service.Delete(id));

        [HttpGet("[action]")]
        public async Task<ActionResult<Resultado<List<GenericList>>>> GetGenericList() =>
            Ok(await service.GetGenericList());
    }
}
