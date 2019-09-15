using System.Globalization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Localization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;

namespace Ouvidoria.Api.Configurations
{
    public static class ApiConfig
    {
        public static IServiceCollection ApiServiceConfig(this IServiceCollection services)
        {
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);

            services.AddCors(options =>
            {
                options.AddPolicy("Development",
                    builder => builder.AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .AllowCredentials()
                );
            });

            return services;
        }

        public static IApplicationBuilder ApiApplicationConfig(this IApplicationBuilder app)
        {
            DefaultFilesOptions options = new DefaultFilesOptions();
            options.DefaultFileNames.Clear();
            options.DefaultFileNames.Add("index.html");
            
            app.UseDefaultFiles(options);
            app.UseStaticFiles();
            app.UseHttpsRedirection();
            app.UseMvc();
            app.UseStaticFiles();

            return app;
        }
    }
}