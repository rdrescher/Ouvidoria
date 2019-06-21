using AutoMapper;
using Ouvidoria.Application.DTOs;
using Ouvidoria.Domain.Models;

namespace Ouvidoria.Application.AutoMapper
{
    internal class DomainToDTOMappingProfile : Profile
    {
        public DomainToDTOMappingProfile()
        {
            CreateMap<Curso, CursoDTO>();
            CreateMap<Departamento, DepartamentoDTO>();
            CreateMap<Manifestacao, ManifestacaoDTO>();
            CreateMap<Pergunta, PerguntaDTO>();
            CreateMap<Questionario, QuestionarioDTO>();
            CreateMap<Resposta, RespostaDTO>();
            CreateMap<Usuario, UsuarioDTO>();
        }
    }
}