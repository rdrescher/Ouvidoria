using AutoMapper;
using Ouvidoria.Application.ViewModel;
using Ouvidoria.Domain.DTO;
using Ouvidoria.Domain.Models;
using System.Linq;

namespace Ouvidoria.Application.AutoMapper
{
    internal class DomainToViewModelMappingProfile : Profile
    {
        public DomainToViewModelMappingProfile()
        {
            #region ViewModels
            CreateMap<Curso, CursoViewModel>();
            CreateMap<Departamento, CadastroDepartamentoViewModel>();
            CreateMap<Departamento, DepartamentoViewModel>()
                .ForMember(c => c.usuarioResponsavel,
                                c => c.MapFrom(d => d.Usuario != null ? d.Usuario.Nome : ""));
            CreateMap<Interacao, InteracaoViewModel>()
                .ForMember(i => i.dataCriacao,
                                i => i.MapFrom(d => d.DataInsercao.ToString("dd/MM/yyyy HH:mm")))
                .ForMember(i => i.Usuario,
                                i => i.MapFrom(u => u.Usuario != null ? u.Usuario.Nome : ""));
            CreateMap<Manifestacao, ManifestacaoViewModel>()
                .ForMember(m => m.usuario,
                                m => m.MapFrom(u => u.Usuario != null ? u.Usuario.Nome : ""))
                .ForMember(m => m.dataCriacao,
                                m => m.MapFrom(i => i.DataInsercao.ToString("dd/MM/yyyy HH:mm")))
                .ForMember(m => m.departamento,
                                m => m.MapFrom(u => u.Departamento != null ? u.Departamento.Nome : ""));
            CreateMap<Manifestacao, ManifestacaoPeviewViewModel>()
                .ForMember(m => m.usuario,
                                m => m.MapFrom(u => u.Usuario != null ? u.Usuario.Nome : ""))
                .ForMember(m => m.departamento,
                                m => m.MapFrom(u => u.Departamento != null ? u.Departamento.Nome : ""))
                .ForMember(m => m.numeroInteracoes,
                                m => m.MapFrom(i => i.Interacoes.Count))
                .ForMember(m => m.dataCriacao,
                                m => m.MapFrom(i => i.DataInsercao.ToString("dd/MM/yyyy HH:mm")))
                .ForMember(m => m.usuarioUltimaInteracao,
                                m => m.MapFrom(u => u.Interacoes != null || u.Interacoes.Count > 0
                                                        ? u.Interacoes.LastOrDefault().Usuario != null
                                                            ? u.Interacoes.LastOrDefault().Usuario.Nome
                                                            : ""
                                                        : ""));
            CreateMap<Opcao, OpcaoViewModel>();
            CreateMap<OpcaoDTO, OpcaoReportViewModel>();
            CreateMap<Pergunta, PerguntaViewModel>();
            CreateMap<PerguntaDTO, PerguntaReportViewModel>();
            CreateMap<Questionario, QuestionarioViewModel>();
            CreateMap<Questionario, QuestionarioPreviewViewModel>()
                .ForMember(q => q.dataFim,
                                q => q.MapFrom(c => c.DataFim.ToString("dd/MM/yyyy HH:mm")));
            CreateMap<Questionario, DetalheQuestionarioViewModel>()
                .ForMember(c => c.usuarioCriador,
                                c => c.MapFrom(d => d.Usuario != null ? d.Usuario.Nome : ""))
                .ForMember(c => c.perguntas,
                                c => c.MapFrom(d => d.Perguntas.Count))
                .ForMember(c => c.respostas,
                                c => c.MapFrom(d => d.QuestionarioRespostas.Count))
                .ForMember(c => c.dataFim,
                                c => c.MapFrom(d => d.DataFim.ToString("dd/MM/yyyy HH:mm")))
                .ForMember(c => c.dataInicio,
                                c => c.MapFrom(d => d.DataInicio.ToString("dd/MM/yyyy HH:mm")));
            CreateMap<QuestionarioDTO, QuestionarioReportViewModel>();
            CreateMap<QuestionarioResposta, QuestionarioRespostaViewModel>()
                .ForMember(q => q.usuario,
                                q => q.MapFrom(r => r.Usuario != null ? r.Usuario.Nome : ""))
                .ForMember(q => q.dataInsercao,
                                q => q.MapFrom(r => r.DataInsercao.ToString("dd/MM/yyyy HH:mm")));
            CreateMap<QuestionarioResposta, QuestionarioRespostaDetailViewModel>()
                .ForMember(q => q.usuario,
                                q => q.MapFrom(r => r.Usuario != null ? r.Usuario.Nome : ""))
                .ForMember(q => q.dataCriacao,
                                q => q.MapFrom(r => r.DataInsercao.ToString("dd/MM/yyyy HH:mm")))
                .ForMember(q => q.titulo,
                                q => q.MapFrom(r => r.Questionario != null ? r.Questionario.Titulo : ""));
            CreateMap<Usuario, UsuarioViewModel>();
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