using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Ouvidoria.Domain.Models;

namespace Ouvidoria.Infrastructure.Mappings
{
    public class ManifestacaoMapping : IEntityTypeConfiguration<Manifestacao>
    {
        public void Configure(EntityTypeBuilder<Manifestacao> builder)
        {
            builder.HasKey(c => c.Id);

            builder.Property(c => c.Titulo)
                .IsRequired()
                .HasColumnType("varchar(150)");

            builder.Property(c => c.Descricao)
                .IsRequired()
                .HasColumnType("varchar(5000)");

            builder.HasOne(c => c.Usuario)
                .WithMany(c => c.Manifestacoes)
                .HasForeignKey(c => c.IdUsuario);

            builder.HasOne(c => c.Departamento)
                .WithMany(c => c.Manifestacoes)
                .HasForeignKey(c => c.IdDepartamento);

            builder.Property(c => c.TipoManifestacao)
                .IsRequired();

            builder.Property(c => c.DataInsercao)
                .IsRequired()
                .HasColumnType("datetime");

            builder.Property(c => c.DataAtualizacao)
                .IsRequired()
                .HasColumnType("datetime");

            builder.ToTable("Manifestacao");
        }
    }
}