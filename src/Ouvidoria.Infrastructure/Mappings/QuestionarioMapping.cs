using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Ouvidoria.Domain.Models;

namespace Ouvidoria.Infrastructure.Mappings
{
    public class QuestionarioMapping : IEntityTypeConfiguration<Questionario>
    {
        public void Configure(EntityTypeBuilder<Questionario> builder)
        {
            builder.HasKey(c => c.Id);

            builder.Property(c => c.Titulo)
                .IsRequired()
                .HasColumnType("varchar(100)");

            builder.Property(c => c.Descricao)
                .IsRequired()
                .HasColumnType("varchar(5000)");

            builder.HasOne(c => c.Usuario)
                .WithMany(c => c.Questionarios)
                .HasForeignKey(c => c.IdUsuarioCriador);

            builder.Property(c => c.DataInicio)
                .IsRequired()
                .HasColumnType("datetime");

            builder.Property(c => c.DataFim)
                .IsRequired()
                .HasColumnType("datetime");

            builder.Property(c => c.DataInsercao)
                .IsRequired()
                .HasColumnType("datetime");

            builder.Property(c => c.DataAtualizacao)
                .IsRequired()
                .HasColumnType("datetime");

            builder.ToTable("Questionario");
        }
    }
}