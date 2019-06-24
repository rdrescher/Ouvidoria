using System;
using AutoMapper;
using Ouvidoria.Application.AutoMapper;
using Microsoft.Extensions.DependencyInjection;

namespace Ouvidoria.Application.Extensions
{
    public static class AutoMapperSetup
    {
        public static void AddAutoMapperSetup(this IServiceCollection services)
        {
            if (services == null) throw new ArgumentNullException(nameof(services));

            AutoMapperConfig.RegisterMappings();
        }
    }
}