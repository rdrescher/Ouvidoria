using System;
using AutoMapper;
using Ouvidoria.Application.AutoMapper;
using Microsoft.Extensions.DependencyInjection;

namespace Ouvidoria.Application.Extensions
{
    public static class AutoMapperSetup
    {
        [Obsolete]
        public static void AddAutoMapperSetup(this IServiceCollection services)
        {
            if (services == null) throw new ArgumentNullException(nameof(services));

            services.AddAutoMapper();
            // Registering Mappings automatically only works if the 
            // Automapper Profile classes are in ASP.NET project
            AutoMapperConfig.RegisterMappings();
        }
    }
}