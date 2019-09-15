using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Ouvidoria.Domain.Models;

namespace Ouvidoria.Infrastructure.Mappings
{
    public class RespostaMapping : IEntityTypeConfiguration<Resposta>
    {
        public void Configure(EntityTypeBuilder<Resposta> builder)
        {
            builder.HasKey(c => c.Id);

            builder.Property(c => c.Retorno)
                .HasColumnType("varchar(50)");

            builder.HasOne(c => c.Opcao)
                .WithMany(c => c.Respostas)
                .HasForeignKey(c => c.IdOpcao);

            builder.HasOne(c => c.Pergunta)
                .WithMany(c => c.Respostas)
                .HasForeignKey(c => c.IdPergunta);

            builder.HasOne(c => c.QuestionarioResposta)
                .WithMany(c => c.Respostas)
                .HasForeignKey(c => c.IdQuestionarioResposta);

            builder.Property(c => c.DataInsercao)
                .IsRequired()
                .HasColumnType("datetime");

            builder.Property(c => c.DataAtualizacao)
                .IsRequired()
                .HasColumnType("datetime");

            builder.ToTable("Resposta");
        }
    }
}