using System;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using Ouvidoria.Api.Extensions;
using Ouvidoria.CrossCutting.Identity.Context;
using Ouvidoria.CrossCutting.Identity.Models;

namespace Ouvidoria.Api.Configurations
{
    public static class IdentityConfig
    {
        public static IServiceCollection IdentityServiceConfig(this IServiceCollection services)
        {
            if (services == null) throw new ArgumentNullException(nameof(services));

            services.AddDefaultIdentity<AspNetUser>()
                .AddRoles<AspNetRole>()
                .AddEntityFrameworkStores<ApplicationContext>()
                .AddErrorDescriber<IdentityPortugueseMessages>()
                .AddDefaultTokenProviders();

            return services;
        }
    }
}