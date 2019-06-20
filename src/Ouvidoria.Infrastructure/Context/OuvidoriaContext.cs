using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Ouvidoria.Domain.Models;

namespace Ouvidoria.Infrastructure.Context
{
    public class OuvidoriaContext : DbContext
    {
        private readonly IHostingEnvironment Env;

        public OuvidoriaContext(IHostingEnvironment env)
        {
            this.Env = env;
        }

        public DbSet<Curso> Cursos { get; set; }
        public DbSet<Departamento> Departamentos { get; set; }
        public DbSet<Manifestacao> Manifestacoes { get; set; }
        public DbSet<Opcao> Opcaos { get; set; }
        public DbSet<Pergunta> Perguntas { get; set; }
        public DbSet<Questionario> Questionarios { get; set; }
        public DbSet<QuestionarioResposta> QuestionarioRespostas { get; set; }
        public DbSet<Resposta> Respostas { get; set; }
        public DbSet<Usuario> Usuarios { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var config = new ConfigurationBuilder()
                .SetBasePath(Env.ContentRootPath)
                .AddJsonFile("appsettings.json")
                .Build();

            optionsBuilder.UseSqlServer(config.GetConnectionString("DefaultConnection"), builder =>
                {
                    builder.EnableRetryOnFailure(5, TimeSpan.FromSeconds(10), null);
                });
        }
    }
}