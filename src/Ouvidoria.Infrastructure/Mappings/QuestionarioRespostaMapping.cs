using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Ouvidoria.Domain.Models;

namespace Ouvidoria.Infrastructure.Mappings
{
    public class QuestionarioRespostaMapping : IEntityTypeConfiguration<QuestionarioResposta>
    {
        public void Configure(EntityTypeBuilder<QuestionarioResposta> builder)
        {
            builder.HasKey(c => c.Id);

            builder.HasOne(c => c.Questionario)
                .WithMany(c => c.QuestionarioRespostas)
                .HasForeignKey(c  => c.IdQuestionario);

            builder.HasOne(c => c.Usuario)
                .WithMany(c => c.QuestionarioResposta)
                .HasForeignKey(c => c.IdUsuario);

            builder.Property(c => c.DataInsercao)
                .IsRequired()
                .HasColumnType("datetime");

            builder.Property(c => c.DataAtualizacao)
                .IsRequired()
                .HasColumnType("datetime");

            builder.ToTable("QuestionarioResposta");
        }
    }
}