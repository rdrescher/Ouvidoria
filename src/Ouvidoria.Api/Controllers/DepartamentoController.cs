using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Ouvidoria.Application.DTOs;
using Ouvidoria.Application.Interfaces;
using Ouvidoria.Application.Utils;

namespace Ouvidoria.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartamentoController: ControllerBase
    {
        private readonly IDepartamentoAppService service;
        public DepartamentoController(IDepartamentoAppService service)
        {
            this.service = service;
        }

        [HttpGet]
        public async Task<ActionResult<Resultado<List<DepartamentoDTO>>>> Get() =>
            Ok(await service.GetDepartments());

         [HttpPost]
         public async Task<ActionResult<Resultado<DepartamentoDTO>>> Post(CadastroDepartamentoDTO cadastroDepartamentoDTO) =>
             ModelState.IsValid ?
                 Ok(await service.Create(cadastroDepartamentoDTO)) :
                 Ok(Resultado<DepartamentoDTO>.Failed(ModelState.Values.Select(x => x.Errors).ToString()));


        // [HttpPut("{id:int}")]
        // public async Task<ActionResult<Resultado<UsuarioDTO>>> Put(int id, CadastroDepartamentoDTO cadastroDepartamentoDTO)
        // {
        //     if(id != cadastroDepartamentoDTO.id) return BadRequest();
        //     return ModelState.IsValid ?
        //         Ok(await service.Update(cadastroDepartamentoDTO)) :
        //         Ok(Resultado<CursoDTO>.Failed(ModelState.Values.Select(x => x.Errors).ToString()));
        // }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult<Resultado>> Delete(int id) =>
            Ok(await service.Delete(id));
    }
}
