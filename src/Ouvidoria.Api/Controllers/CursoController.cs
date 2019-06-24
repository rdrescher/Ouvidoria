using System;
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
    public class CursoController : ControllerBase
    {
        private readonly ICursoAppService service;
        public CursoController(ICursoAppService service)
        {
            this.service = service;

        }

        [HttpGet]
        public async Task<ActionResult<Resultado<List<CursoDTO>>>> Get()
        {
            var cursos = await service.GetClasses();
            if(!cursos.Success)
                return BadRequest(cursos);
            return Ok(cursos);
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public ActionResult<string> Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody] string value)
        {
            
        }

        // PUT api/values/5
        [HttpPut]
        public async Task<ActionResult<Resultado<CursoDTO>>> Put(CursoDTO cursoDTO)
        {
            var curso = await service.Update(cursoDTO);
            if(!curso.Success)
                return BadRequest(curso);
            return Ok(curso);
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
