using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Ouvidoria.Domain.DTO;
using Ouvidoria.Domain.Enums;
using Ouvidoria.Domain.Interfaces;
using Ouvidoria.Domain.Models;
using Ouvidoria.Infrastructure.Context;

namespace Ouvidoria.Infrastructure.Repositories
{
    public class UsuarioRepository : EntityRepository<Usuario>, IUsuarioRepository
    {
        public UsuarioRepository(OuvidoriaContext context) : base(context)
        { }

        public async Task<List<UsuarioDto>> GetAllWithClass() =>
            await base.DbSet.AsNoTracking()
                .Include(x => x.Curso)
                .Include(x => x.Claims)
                .Select(x => new UsuarioDto
                {
                    Ativo = x.Ativo,
                    CPF = x.CPF,
                    Curso = x.Curso,
                    Id = x.Id,
                    IdCurso = x.IdCurso,
                    Email = x.Email,
                    Nome = x.Nome,
                    Telefone = x.Telefone,
                    UsuarioPerfil = x.Claims.Count == 0
                        ? UsuarioPerfil.Usuario
                        : (UsuarioPerfil)System.Enum.Parse(typeof(UsuarioPerfil), x.Claims.FirstOrDefault().Valor)
                })
                .ToListAsync();

        public async Task<(string email, string cpf)> GetEmailCPF(int id)
        {
            var user = await DbSet.AsNoTracking().FirstOrDefaultAsync(u => u.Id == id);
            return (user.Email, user.CPF);
        }
    }
}