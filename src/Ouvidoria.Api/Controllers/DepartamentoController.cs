using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Ouvidoria.Application.DTO;
using Ouvidoria.Application.Interfaces;
using Ouvidoria.Application.Utils;

namespace Ouvidoria.Api.Controllers
{
    [Authorize(policy: "Administrador")]
    [Route("api/[controller]")]
    [ApiController]
    public class DepartamentoController : BaseController
    {
        private readonly IDepartamentoAppService _service;
        public DepartamentoController(IDepartamentoAppService service)
        {
            this._service = service;
        }

        [HttpGet]
        public async Task<ActionResult<Resultado<List<DepartamentoDTO>>>> Get() =>
            Ok(await _service.GetDepartments());

        [HttpPost]
        public async Task<ActionResult<Resultado<DepartamentoDTO>>> Post(CadastroDepartamentoDTO cadastroDepartamentoDTO) =>
            ModelState.IsValid ?
                Ok(await _service.Create(cadastroDepartamentoDTO)) :
                Ok(Resultado<DepartamentoDTO>.Failed(ModelState.Values.Select(x => x.Errors).ToString()));


        [HttpPut("{id:int}")]
        public async Task<ActionResult<Resultado<DepartamentoDTO>>> Put(int id, AtualizacaoDepartamentoDTO departamentoDTO)
        {
            if (id != departamentoDTO.id) return BadRequest();
            return ModelState.IsValid ?
                Ok(await _service.Update(departamentoDTO)) :
                Ok(Resultado<DepartamentoDTO>.Failed(ModelState.Values.Select(x => x.Errors).ToString()));
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult<Resultado>> Delete(int id) =>
            Ok(await _service.Delete(id));
    }
}
