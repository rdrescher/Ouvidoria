using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Ouvidoria.Domain.Interfaces;
using Ouvidoria.Services.Interfaces;
using Ouvidoria.Infrastructure.Context;
using Ouvidoria.Infrastructure.Repositories;
using Ouvidoria.Services;
using Ouvidoria.Domain.Notificacoes;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using Ouvidoria.Application.Interfaces;
using Ouvidoria.Application.Services;

namespace Ouvidoria.CrossCutting.IoC
{
    public static class NativeCoreInjector
    {
        public static IServiceCollection AddDependencies(this IServiceCollection services, IConfiguration configuration)
        {
            //Notificator
            services.AddScoped<INotificador, Notificador>();

            //Application Services
            services.AddScoped<ICursoAppService, CursoAppService>();
            services.AddScoped<IDepartamentoAppService, DepartamentoAppService>();
            services.AddScoped<IManifestacaoAppService, ManifestacaoAppService>();
            services.AddScoped<IOpcaoAppService, OpcaoAppService>();
            services.AddScoped<IPerguntaAppService, PerguntaAppService>();
            services.AddScoped<IQuestionarioAppService, QuestionarioAppService>();
            services.AddScoped<IRespostaAppService, RespostaAppService>();
            services.AddScoped<IUsuarioAppService, UsuarioAppService>();
            
            //Domain Services
            services.AddScoped<ICursoService, CursoService>();
            services.AddScoped<IDepartamentoService, DepartamentoService>();
            services.AddScoped<IManifestacaoService, ManifestacaoService>();
            services.AddScoped<IOpcaoService, OpcaoService>();
            services.AddScoped<IPerguntaService, PerguntaService>();
            services.AddScoped<IQuestionarioService, QuestionarioService>();
            services.AddScoped<IQuestionarioRespostaService, QuestionarioRespostaService>();
            services.AddScoped<IRespostaService, RespostaService>();
            services.AddScoped<IUsuarioService, UsuarioService>();

            //Repositories
            services.AddScoped<ICursoRepository, CursoRepository>();
            services.AddScoped<IDepartamentoRepository, DepartamentoRepository>();
            services.AddScoped<IManifestacaoRepository, ManifestacaoRepository>();
            services.AddScoped<IOpcaoRepository, OpcaoRepository>();
            services.AddScoped<IPerguntaRepository, PerguntaRepository>();
            services.AddScoped<IQuestionarioRepository, QuestionarioRepository>();
            services.AddScoped<IQuestionarioRespostaRepository, QuestionarioRespostaRepository>();
            services.AddScoped<IRespostaRepository, RespostaRepository>();
            services.AddScoped<IUsuarioRepository, UsuarioRepository>();

            //DataContext
            services.AddDbContext<OuvidoriaContext>(options =>
                options.UseSqlServer(configuration.GetConnectionString("DefaultConnection")));

            return services;
        }
    }
}