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

            CreateMap<DepartamentoViewModel, Departamento>();
            CreateMap<ManifestacaoViewModel, Manifestacao>();
            CreateMap<PerguntaViewModel, Pergunta>();
            CreateMap<QuestionarioViewModel, Questionario>();
            CreateMap<RespostaViewModel, Resposta>();
            CreateMap<UsuarioViewModel, Usuario>();

            #region Updates
            CreateMap<AtualizacaoDepartamentoViewModel, Departamento>();
            CreateMap<AtualizacaoUsuarioViewModel, Usuario>();
            #endregion

            #region Inserts
            CreateMap<CadastroDepartamentoViewModel, Departamento>()
                .ConstructUsing(d => new Departamento(d.nome, d.idUsuarioResponsavel));
            CreateMap<CadastroUsuarioViewModel, Usuario>()
                .ConstructUsing(u => new Usuario(u.nome, u.email, u.telefone, u.cpf, u.idCurso));
            CreateMap<CursoViewModel, Curso>()
                .ConstructUsing(c => new Curso(c.nome));
            CreateMap<CadastroOpcaoViewModel, Opcao>()
                .ConstructUsing(o => new Opcao(o.descricao));
            CreateMap<CadastroPerguntaViewModel, Pergunta>()
                .ConstructUsing(p => new Pergunta(p.descricao, p.tipo));
            CreateMap<CadastroQuestionarioViewModel, Questionario>()
                .ConstructUsing(q => new Questionario(q.titulo, q.descricao, q.dataInicio, q.dataFim));
            #endregion

            #endregion

            #region Identity
            CreateMap<CadastroUsuarioViewModel, AspNetUser>()
                .ConstructUsing(c => new AspNetUser(c.nome, c.email, c.cpf, c.telefone, c.idCurso, true));
            #endregion
        }
    }
}