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
            CreateMap<Departamento, CadastroDepartamentoDTO>();
            CreateMap<Manifestacao, ManifestacaoDTO>();
            CreateMap<Pergunta, PerguntaDTO>();
            CreateMap<Questionario, QuestionarioDTO>();
            CreateMap<Resposta, RespostaDTO>();
            CreateMap<Usuario, UsuarioDTO>();
            CreateMap<Departamento, DepartamentoDTO>()
                .ForMember(c => c.usuarioResponsavel,
                           c => c.MapFrom(d => d.Usuario != null ? d.Usuario.Nome : ""));
        }
    }
}