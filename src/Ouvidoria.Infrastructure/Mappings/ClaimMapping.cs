using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Ouvidoria.Domain.Models;

namespace Ouvidoria.Infrastructure.Mappings
{
    public class ClaimMapping: IEntityTypeConfiguration<Claim>
    {
        public void Configure(EntityTypeBuilder<Claim> builder)
        {
            builder.Property(x => x.IdUser)
                .HasColumnName("UserId");
            
            builder.Property(x => x.Tipo)
                .HasColumnName("ClaimType");

            builder.Property(x => x.Valor)
                .HasColumnName("ClaimValue");
            
            builder.HasOne(x => x.Usuario)
                .WithMany(x =>  x.Claims)
                .HasForeignKey(x => x.IdUser);

            builder.ToTable("AspNetUserClaims");
        }
    }
}