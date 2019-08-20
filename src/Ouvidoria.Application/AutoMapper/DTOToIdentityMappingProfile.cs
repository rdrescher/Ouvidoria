using AutoMapper;
using Ouvidoria.Application.DTO;
using Ouvidoria.CrossCutting.Identity.Models;

namespace Ouvidoria.Application.AutoMapper
{
    public class DTOToIdentityMappingProfile : Profile
    {
        public DTOToIdentityMappingProfile()
        {
            CreateMap<CadastroUsuarioDTO, AspNetUser>()
                .ConstructUsing(c => new AspNetUser(c.nome, c.email, c.cpf, c.telefone, c.idCurso, c.ativo));
        }
    }
}