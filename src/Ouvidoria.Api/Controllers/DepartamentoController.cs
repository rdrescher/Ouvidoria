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
    public class DepartamentoController : BaseController
    {
        private readonly IDepartamentoAppService _service;
        public DepartamentoController(IDepartamentoAppService service)
        {
            this._service = service;
        }

        [Authorize(policy: "Administrador")]
        [HttpGet]
        public async Task<ActionResult<Resultado<List<DepartamentoViewModel>>>> Get() =>
            Ok(await _service.GetDepartments());

        [Authorize(policy: "Administrador")]
        [HttpPost]
        public async Task<ActionResult<Resultado<DepartamentoViewModel>>> Post(CadastroDepartamentoViewModel cadastroDepartamentoViewModel) =>
            ModelState.IsValid ?
                Ok(await _service.Create(cadastroDepartamentoViewModel)) :
                Ok(Resultado<DepartamentoViewModel>.Failed(ModelState.Values.Select(x => x.Errors).ToString()));

        [Authorize(policy: "Administrador")]
        [HttpPut("{id:int}")]
        public async Task<ActionResult<Resultado<DepartamentoViewModel>>> Put(int id, AtualizacaoDepartamentoViewModel departamentoViewModel)
        {
            if (id != departamentoViewModel.id) return BadRequest();
            return ModelState.IsValid ?
                Ok(await _service.Update(departamentoViewModel)) :
                Ok(Resultado<DepartamentoViewModel>.Failed(ModelState.Values.Select(x => x.Errors).ToString()));
        }

        [Authorize(policy: "Administrador")]
        [HttpDelete("{id:int}")]
        public async Task<ActionResult<Resultado>> Delete(int id) =>
            Ok(await _service.Delete(id));

        [HttpGet("[action]")]
        public async Task<ActionResult<Resultado<List<GenericList>>>> GetGenericList() =>
            Ok(await _service.GetGenericList());
    }
}
