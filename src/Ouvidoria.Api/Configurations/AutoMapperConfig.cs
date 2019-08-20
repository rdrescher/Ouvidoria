using System;
using AutoMapper;
using Ouvidoria.Application.AutoMapper;
using Microsoft.Extensions.DependencyInjection;

namespace Ouvidoria.Api.Configurations
{
    public static class AutoMapperConfig
    {
        public static IServiceCollection AutoMapperServiceConfig(this IServiceCollection services)
        {
            if (services == null) throw new ArgumentNullException(nameof(services));

            var mappingConfig = AutoMapperSetup.RegisterMappings();
            IMapper mapper = mappingConfig.CreateMapper();
            services.AddSingleton(mapper);

            return services;
        }
    }
}