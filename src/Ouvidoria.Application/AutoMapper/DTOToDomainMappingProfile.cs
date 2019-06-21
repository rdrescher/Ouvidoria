using AutoMapper;
using Ouvidoria.Application.DTOs;
using Ouvidoria.Domain.Models;

namespace Ouvidoria.Application.AutoMapper
{
    internal class DTOToDomainMappingProfile : Profile
    {
        public DTOToDomainMappingProfile()
        {
            CreateMap<CursoDTO, Curso>();
            CreateMap<DepartamentoDTO, Departamento>();
            CreateMap<ManifestacaoDTO, Manifestacao>();
            CreateMap<PerguntaDTO, Pergunta>();
            CreateMap<QuestionarioDTO, Questionario>();
            CreateMap<RespostaDTO, Resposta>();
            CreateMap<UsuarioDTO, Usuario>();
        }
    }
}