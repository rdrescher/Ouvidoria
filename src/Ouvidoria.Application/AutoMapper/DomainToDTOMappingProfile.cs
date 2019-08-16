using AutoMapper;
using Ouvidoria.Application.DTO;
using Ouvidoria.Domain.Models;

namespace Ouvidoria.Application.AutoMapper
{
    internal class DomainToDTOMappingProfile : Profile
    {
        public DomainToDTOMappingProfile()
        {
            #region DTOs
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
            #endregion

            #region GenericLists
            CreateMap<Curso, GenericList>()
                .ConstructUsing(c => new GenericList(c.Id, c.Nome));
            CreateMap<Usuario, GenericList>()
                .ConstructUsing(u => new GenericList(u.Id, u.Nome));
            #endregion
        }
    }
}