using AutoMapper;
using Ouvidoria.Application.DTO;
using Ouvidoria.Domain.Models;

namespace Ouvidoria.Application.AutoMapper
{
    internal class DTOToDomainMappingProfile : Profile
    {
        public DTOToDomainMappingProfile()
        {
            CreateMap<AtualizacaoDepartamentoDTO, Departamento>();
            CreateMap<CadastroDepartamentoDTO, Departamento>()
                .ConstructUsing(d => new Departamento(d.nome, d.idUsuarioResponsavel));
            CreateMap<CadastroUsuarioDTO, Usuario>()
                .ConstructUsing(u => new Usuario(u.nome, u.email, u.telefone, u.cpf, u.senha, u.idCurso, u.usuarioPerfil));
            CreateMap<CursoDTO, Curso>()
                .ConstructUsing(c => new Curso(c.nome));
            CreateMap<DepartamentoDTO, Departamento>();
            CreateMap<ManifestacaoDTO, Manifestacao>();
            CreateMap<PerguntaDTO, Pergunta>();
            CreateMap<QuestionarioDTO, Questionario>();
            CreateMap<RespostaDTO, Resposta>();
            CreateMap<UsuarioDTO, Usuario>();
        }
    }
}