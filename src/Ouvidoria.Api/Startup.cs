using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Ouvidoria.CrossCutting.IoC;
using Ouvidoria.Api.Configurations;

namespace Ouvidoria.Api
{
    public class Startup
    {
        public IConfiguration Configuration { get; }


        public Startup(IHostingEnvironment environment)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(environment.ContentRootPath)
                .AddJsonFile("appsettings.json", true, true)
                .AddJsonFile($"appsettings.{environment.EnvironmentName}.json", true, true)
                .AddEnvironmentVariables();

            Configuration = builder.Build();
        }


        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDependencies(Configuration);
            services.IdentityServiceConfig(Configuration);
            services.SwaggerServiceConfig();
            services.AutoMapperServiceConfig();
            services.ApiServiceConfig();
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }

            app.UseAuthentication();
            app.UseCors("Development");
            app.SwaggerApplicationConfig();
            app.ApiApplicationConfig(env);
        }
    }
}
