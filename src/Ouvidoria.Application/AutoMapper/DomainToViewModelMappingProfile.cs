using AutoMapper;
using Ouvidoria.Application.ViewModel;
using Ouvidoria.Domain.DTO;
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
            CreateMap<Questionario, QuestionarioDetailViewModel>()
                .ForMember(c => c.usuarioCriador,
                                c => c.MapFrom(d => d.Usuario != null ? d.Usuario.Nome : ""))
                .ForMember(c => c.perguntas,
                                c => c.MapFrom(d => d.Perguntas.Count))
                .ForMember(c => c.respostas,
                                c => c.MapFrom(d => d.QuestionarioRespostas.Count));
            CreateMap<Resposta, RespostaViewModel>();
            CreateMap<Usuario, UsuarioViewModel>();
            CreateMap<Departamento, DepartamentoViewModel>()
                .ForMember(c => c.usuarioResponsavel,
                                c => c.MapFrom(d => d.Usuario != null ? d.Usuario.Nome : ""));
            CreateMap<UsuarioDto, UsuarioViewModel>();

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