using AutoMapper;
using Ouvidoria.Application.ViewModel;
using Ouvidoria.Domain.DTO;
using Ouvidoria.Domain.Enums;
using Ouvidoria.Domain.Models;

namespace Ouvidoria.Application.AutoMapper
{
    internal class DomainToViewModelMappingProfile : Profile
    {
        public DomainToViewModelMappingProfile()
        {
            #region ViewModels
            CreateMap<Curso, CursoViewModel>();
            CreateMap<Departamento, CadastroDepartamentoViewModel>();
            CreateMap<Manifestacao, ManifestacaoViewModel>();
            CreateMap<Opcao, OpcaoViewModel>();
            CreateMap<Pergunta, PerguntaViewModel>();
            CreateMap<Questionario, QuestionarioViewModel>();
            CreateMap<Questionario, QuestionarioPreviewViewModel>()
                .ForMember(q => q.dataFim,
                                q => q.MapFrom(c => c.DataFim.ToString("dd/MM/yyyy hh:mm")));
            CreateMap<Questionario, DetalheQuestionarioViewModel>()
                .ForMember(c => c.usuarioCriador,
                                c => c.MapFrom(d => d.Usuario != null ? d.Usuario.Nome : ""))
                .ForMember(c => c.perguntas,
                                c => c.MapFrom(d => d.Perguntas.Count))
                .ForMember(c => c.respostas,
                                c => c.MapFrom(d => d.QuestionarioRespostas.Count))
                .ForMember(c => c.dataFim,
                                c => c.MapFrom(d => d.DataFim.ToString("dd/MM/yyyy hh:mm")))
                .ForMember(c => c.dataInicio,
                                c => c.MapFrom(d => d.DataInicio.ToString("dd/MM/yyyy hh:mm")));
            CreateMap<QuestionarioResposta, QuestionarioRespostaViewModel>()
                .ForMember(q => q.usuario,
                                q => q.MapFrom(r => r.Usuario != null ? r.Usuario.Nome : ""));
            CreateMap<Usuario, UsuarioViewModel>();
            CreateMap<Departamento, DepartamentoViewModel>()
                .ForMember(c => c.usuarioResponsavel,
                                c => c.MapFrom(d => d.Usuario != null ? d.Usuario.Nome : ""));
            CreateMap<UsuarioDto, UsuarioViewModel>();
            CreateMap<Resposta, RespostaViewModel>()
                .ForMember(r => r.pergunta,
                                r => r.MapFrom(p => p.Pergunta != null ? p.Pergunta.Descricao : ""))
                .ForMember(r => r.resposta,
                                d => d.MapFrom(x => x.Opcao == null
                                                        ? x.Retorno
                                                        : x.Opcao.Descricao));

            #endregion

            #region GenericLists
            CreateMap<Curso, GenericList>()
                .ConstructUsing(c => new GenericList(c.Id, c.Nome));
            CreateMap<Usuario, GenericList>()
                .ConstructUsing(u => new GenericList(u.Id, u.Nome));
            CreateMap<Departamento, GenericList>()
                .ConstructUsing(u => new GenericList(u.Id, u.Nome));
            #endregion
        }
    }
}