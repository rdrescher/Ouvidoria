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

        [HttpPost]
        public async Task<ActionResult<Resultado<UsuarioDTO>>> Post(CadastroUsuarioDTO cadastroUsuarioDTO) =>
            ModelState.IsValid ?
                Ok(await service.Create(cadastroUsuarioDTO)) :
                Ok(Resultado<UsuarioDTO>.Failed(ModelState.Values.Select(x => x.Errors).ToString()));

        [HttpPut("{id:int}")]
        public async Task<ActionResult<Resultado<UsuarioDTO>>> Put(int id, CadastroUsuarioDTO cadastroUsuarioDTO)
        {
            if(id != cadastroUsuarioDTO.id) return BadRequest();
            return ModelState.IsValid ?
                Ok(await service.Update(cadastroUsuarioDTO)) :
                Ok(Resultado<CursoDTO>.Failed(ModelState.Values.Select(x => x.Errors).ToString()));
        }
    }
}
