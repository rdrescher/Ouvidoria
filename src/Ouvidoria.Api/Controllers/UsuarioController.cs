using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Ouvidoria.Application.DTOs;
using Ouvidoria.Application.Interfaces;
using Ouvidoria.Application.Utils;

namespace Ouvidoria.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController: ControllerBase
    {
        private readonly IUsuarioAppService service;
        public UsuarioController(IUsuarioAppService service)
        {
            this.service = service;
        }

        [HttpGet]
        public async Task<ActionResult<Resultado<List<UsuarioDTO>>>> Get() =>
            Ok(await service.GetUsers());

        // [HttpPost]
        // public async Task<ActionResult<Resultado<UsuarioDTO>>> Post(UsuarioDTO cursoDTO) =>
        //     ModelState.IsValid ?
        //         Ok(await service.Create(cursoDTO)) :
        //         Ok(Resultado<CursoDTO>.Failed(ModelState.Values.Select(x => x.Errors).FirstOrDefault().ToString()));

        // [HttpPut("{id:int}")]
        // public async Task<ActionResult<Resultado<CursoDTO>>> Put(int id, CursoDTO cursoDTO)
        // {
        //     if(id != cursoDTO.id) return BadRequest();
        //     return ModelState.IsValid ?
        //         Ok(await service.Update(cursoDTO)) :
        //         Ok(Resultado<CursoDTO>.Failed(ModelState.Values.Select(x => x.Errors).FirstOrDefault().ToString()));
        // }

        // [HttpDelete("{id:int}")]
        // public async Task<ActionResult<Resultado>> Delete(int id) =>
        //     Ok(await service.Delete(id));
    }
}
