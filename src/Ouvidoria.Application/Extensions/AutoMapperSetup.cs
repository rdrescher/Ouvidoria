using System;
using AutoMapper;
using Ouvidoria.Application.AutoMapper;
using Microsoft.Extensions.DependencyInjection;

namespace Ouvidoria.Application.Extensions
{
    public static class AutoMapperSetup
    {
        public static void AddAutoMapperSetup(this IServiceCollection services, Type type)
        {
            if (services == null) throw new ArgumentNullException(nameof(services));

            var mappingConfig = AutoMapperConfig.RegisterMappings();
            IMapper mapper = mappingConfig.CreateMapper();
            services.AddSingleton(mapper);
        }
    }
}