using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Swashbuckle.AspNetCore.Swagger;

namespace Ouvidoria.Api.Configurations
{
    public static class SwaggerConfig
    {
        public static IServiceCollection SwaggerServiceConfig(this IServiceCollection services)
        {
            services.AddSwaggerGen(swg =>
            {
                swg.SwaggerDoc("v1", new Info
                {
                    Version = "v1",
                    Title = "Ouvidoria",
                    Description = "Sistema de Ouvidoria da Faculdade Antonio Meneghetti",
                    Contact = new Contact { Name = "Ouvidoria - AMF", Email = "ouvidoria@faculdadeam.edu.br", Url = "http://www.faculdadeam.edu.br" },
                });
            });

            return services;
        }
        public static IApplicationBuilder SwaggerApplicationConfig(this IApplicationBuilder app)
        {
            app.UseSwagger();

            app.UseSwaggerUI(s =>
            {
                s.SwaggerEndpoint("/swagger/v1/swagger.json", "Ouvidoria - AMF | API v1.0");
            });

            return app;
        }
    }

}