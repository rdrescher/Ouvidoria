using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Ouvidoria.Domain.Models;

namespace Ouvidoria.Infrastructure.Mappings
{
    public class PerguntaMapping : IEntityTypeConfiguration<Pergunta>
    {
        public void Configure(EntityTypeBuilder<Pergunta> builder)
        {
            builder.HasKey(c => c.Id);

            builder.Property(c => c.Descricao)
                .IsRequired()
                .HasColumnType("varchar(5000)");
            
            builder.HasOne(c => c.Questionario)
                .WithMany(c => c.Perguntas)
                .HasForeignKey(c => c.IdQuestionario);

            builder.Property(c => c.DataInsercao)
                .IsRequired()
                .HasColumnType("datetime");

            builder.Property(c => c.DataAtualizacao)
                .IsRequired()
                .HasColumnType("datetime");

            builder.ToTable("Pergunta");
        }
    }
}