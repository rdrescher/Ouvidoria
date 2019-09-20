using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Ouvidoria.Domain.Models;

namespace Ouvidoria.Infrastructure.Mappings
{
    public class InteracaoMapping : IEntityTypeConfiguration<Interacao>
    {
        public void Configure(EntityTypeBuilder<Interacao> builder)
        {
            builder.HasKey(c => c.Id);

            builder.Property(c => c.Descricao)
                .IsRequired()
                .HasColumnType("varchar(5000)");

            builder.HasOne(c => c.Manifestacao)
                .WithMany(c => c.Interacoes)
                .HasForeignKey(c => c.IdManifestacao);

            builder.HasOne(c => c.Usuario)
                .WithMany(c => c.Interacoes)
                .HasForeignKey(c => c.IdUsuario);

            builder.Property(c => c.DataInsercao)
                .IsRequired()
                .HasColumnType("datetime");

            builder.Property(c => c.DataAtualizacao)
                .IsRequired()
                .HasColumnType("datetime");

            builder.ToTable("Interacao");
        }
    }
}