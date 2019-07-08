using AutoMapper;
using Ouvidoria.Application.DTOs;
using Ouvidoria.Domain.Models;

namespace Ouvidoria.Application.AutoMapper
{
    internal class DTOToDomainMappingProfile : Profile
    {
        public DTOToDomainMappingProfile()
        {
            CreateMap<CursoDTO, Curso>()
                .ConstructUsing(c => new Curso(c.nome));
            CreateMap<CadastroUsuarioDTO, Usuario>()
                .ConstructUsing(u => new Usuario(u.nome, u.email, u.telefone, u.cpf, u.senha, u.idCurso, u.usuarioPerfil));
            CreateMap<DepartamentoDTO, Departamento>();
            CreateMap<ManifestacaoDTO, Manifestacao>();
            CreateMap<PerguntaDTO, Pergunta>();
            CreateMap<QuestionarioDTO, Questionario>();
            CreateMap<RespostaDTO, Resposta>();
            CreateMap<UsuarioDTO, Usuario>();
        }
    }
}