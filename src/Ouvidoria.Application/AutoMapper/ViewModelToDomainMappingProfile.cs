using AutoMapper;
using Ouvidoria.Application.ViewModel;
using Ouvidoria.CrossCutting.Identity.Models;
using Ouvidoria.Domain.Models;

namespace Ouvidoria.Application.AutoMapper
{
    internal class ViewModelToDomainMappingProfile : Profile
    {
        public ViewModelToDomainMappingProfile()
        {
            #region Domain
            CreateMap<AtualizacaoDepartamentoViewModel, Departamento>();
            CreateMap<AtualizacaoUsuarioViewModel, Usuario>();
            CreateMap<CadastroDepartamentoViewModel, Departamento>()
                .ConstructUsing(d => new Departamento(d.nome, d.idUsuarioResponsavel));
            CreateMap<CadastroUsuarioViewModel, Usuario>()
                .ConstructUsing(u => new Usuario(u.nome, u.email, u.telefone, u.cpf, u.idCurso));
            CreateMap<CursoViewModel, Curso>()
                .ConstructUsing(c => new Curso(c.nome));
            CreateMap<DepartamentoViewModel, Departamento>();
            CreateMap<ManifestacaoViewModel, Manifestacao>();
            CreateMap<PerguntaViewModel, Pergunta>();
            CreateMap<QuestionarioViewModel, Questionario>();
            CreateMap<RespostaViewModel, Resposta>();
            CreateMap<UsuarioViewModel, Usuario>();
            #endregion

            #region Identity
            CreateMap<CadastroUsuarioViewModel, AspNetUser>()
                .ConstructUsing(c => new AspNetUser(c.nome, c.email, c.cpf, c.telefone, c.idCurso, c.ativo));
            #endregion
        }
    }
}