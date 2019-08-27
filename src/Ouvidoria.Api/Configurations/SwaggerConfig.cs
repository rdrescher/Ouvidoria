using System.Collections.Generic;
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

                var security = new Dictionary<string, IEnumerable<string>>
                {
                    {"Bearer", new string[] { }}
                };

                swg.AddSecurityDefinition("Bearer", new ApiKeyScheme
                {
                    Description = "Insira seu JWT da seguinte maneira: Bearer {seu JWT}",
                    Name = "Authorization",
                    In = "header",
                    Type = "apiKey"
                });

                swg.AddSecurityRequirement(security);
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