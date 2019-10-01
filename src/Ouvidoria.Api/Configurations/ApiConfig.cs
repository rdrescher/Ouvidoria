using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using System.IO;

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

        public static IApplicationBuilder ApiApplicationConfig(
            this IApplicationBuilder app,
            IHostingEnvironment environment
        )
        {
            DefaultFilesOptions options = new DefaultFilesOptions();
            options.DefaultFileNames.Clear();
            options.DefaultFileNames.Add("index.html");

            app.UseDefaultFiles(options);
            app.UseStaticFiles();
            app.UseHttpsRedirection();
            app.UseMvc(x => x.MapRoute("default", "api/{controller}/{action}/{id?}"));
            app.UseStaticFiles();
            app.MapWhen
            (
                x => !x.Request.Path.Value.ToLower().StartsWith("/api"),
                x => x.UseFallbackFile(Path.Combine(environment.WebRootPath, "index.html"), "text/html")
            );

            return app;
        }

        private static IApplicationBuilder UseFallbackFile(this IApplicationBuilder app, string file, string contentType)
        {
            app.Use
            (
                async (context, next) =>
                {
                    context.Response.ContentType = contentType;
                    await context.Response.SendFileAsync(file);
                }
            );

            return app;
        }
    }
}