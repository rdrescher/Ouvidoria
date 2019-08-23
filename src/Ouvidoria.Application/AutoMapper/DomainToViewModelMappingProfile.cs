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
            CreateMap<Pergunta, PerguntaViewModel>();
            CreateMap<Questionario, QuestionarioViewModel>();
            CreateMap<Resposta, RespostaViewModel>();
            CreateMap<Usuario, Application.ViewModel.UsuarioViewModel>();
            CreateMap<Departamento, DepartamentoViewModel>()
                .ForMember(c => c.usuarioResponsavel,
                                c => c.MapFrom(d => d.Usuario != null ? d.Usuario.Nome : ""));
            CreateMap<UsuarioDTO, UsuarioViewModel>();
            
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