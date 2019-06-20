using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Ouvidoria.Domain.Models;

namespace Ouvidoria.Infrastructure.Mappings
{
    public class OpcaoMapping : IEntityTypeConfiguration<Opcao>
    {
        public void Configure(EntityTypeBuilder<Opcao> builder)
        {
            builder.HasKey(c => c.Id);

            builder.Property(c => c.Descricao)
                .IsRequired()
                .HasColumnType("varchar(1000)");

            builder.HasOne(c => c.Pergunta)
                .WithMany(c => c.Opcoes)
                .HasForeignKey(c => c.IdPergunta);

            builder.Property(c => c.DataInsercao)
                .IsRequired()
                .HasColumnType("datetime");

            builder.Property(c => c.DataAtualizacao)
                .IsRequired()
                .HasColumnType("datetime");

            builder.ToTable("Opcao");
        }
    }
}