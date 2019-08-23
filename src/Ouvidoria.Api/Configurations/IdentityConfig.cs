using System;
using System.Text;
using Equinox.Infra.CrossCutting.Identity.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Ouvidoria.Api.Extensions;
using Ouvidoria.Application.Enums;
using Ouvidoria.CrossCutting.Identity.Context;
using Ouvidoria.CrossCutting.Identity.Models;

namespace Ouvidoria.Api.Configurations
{
    public static class IdentityConfig
    {
        public static IServiceCollection IdentityServiceConfig(this IServiceCollection services, IConfiguration configuration)
        {
            if (services == null) throw new ArgumentNullException(nameof(services));

            services.AddDefaultIdentity<AspNetUser>(u =>
                {
                    u.Password.RequireDigit = false;
                    u.Password.RequireLowercase = false;
                    u.Password.RequireNonAlphanumeric = false;
                    u.Password.RequireUppercase = false;
                    u.Password.RequiredUniqueChars = 0;
                })
                .AddRoles<AspNetRole>()
                .AddEntityFrameworkStores<ApplicationContext>()
                .AddErrorDescriber<IdentityPortugueseMessages>()
                .AddDefaultTokenProviders();


            var jwtApplicationSection = configuration.GetSection("JWT");
            services.Configure<JWTSettings>(jwtApplicationSection);

            var jwtSettings = jwtApplicationSection.Get<JWTSettings>();
            var key = Encoding.ASCII.GetBytes(jwtSettings.Secret);

            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(x =>
            {
                x.RequireHttpsMetadata = false;
                x.SaveToken = true;
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidAudience = jwtSettings.ValidIn,
                    ValidIssuer = jwtSettings.Issuer
                };
            });

            services.AddAuthorization(options =>
            {
                options.AddPolicy("Administrador", policy =>
                    policy.Requirements.Add(new ClaimRequirement(
                        UsuarioPerfil.Administrador.ToString(),
                        UsuarioPerfil.Administrador.ToString()))
                );
            });

            return services;
        }
    }
}