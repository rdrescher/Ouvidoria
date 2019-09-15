using System;
using System.Linq;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Ouvidoria.CrossCutting.Identity.Models;

namespace Ouvidoria.CrossCutting.Identity.Context
{
    public class ApplicationContext : IdentityDbContext<AspNetUser, AspNetRole, int>
    {
        private readonly IHostingEnvironment Env;
        public ApplicationContext(
            DbContextOptions<ApplicationContext> options,
            IHostingEnvironment env)
        : base(options)
        {
            Env = env;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var config = new ConfigurationBuilder()
                .SetBasePath(Env.ContentRootPath)
                .AddJsonFile("appsettings.json")
                .Build();

            optionsBuilder.UseSqlServer(config.GetConnectionString("DefaultConnection"), builder =>
                {
                    builder.EnableRetryOnFailure(5, TimeSpan.FromSeconds(10), null);
                });
        }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            foreach (var property in builder.Model.GetEntityTypes()
                .SelectMany(e => e.GetProperties()
                    .Where(p => p.ClrType == typeof(string))))
                property.Relational().ColumnType = "varchar(100)";

            builder.ApplyConfigurationsFromAssembly(typeof(ApplicationContext).Assembly);

            foreach (var relationship in builder.Model.GetEntityTypes().SelectMany(e => e.GetForeignKeys()))
                relationship.DeleteBehavior = DeleteBehavior.ClientSetNull;

            base.OnModelCreating(builder);
        }
    }
}