﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Ouvidoria.Infrastructure.Context;

namespace Ouvidoria.Infrastructure.Migrations
{
    [DbContext(typeof(OuvidoriaContext))]
    partial class OuvidoriaContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.4-servicing-10062")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Ouvidoria.Domain.Models.Curso", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("DataAtualizacao")
                        .HasColumnType("datetime");

                    b.Property<DateTime>("DataInsercao")
                        .HasColumnType("datetime");

                    b.Property<string>("Nome")
                        .IsRequired()
                        .HasColumnType("varchar(50)");

                    b.HasKey("Id");

                    b.ToTable("Curso");
                });

            modelBuilder.Entity("Ouvidoria.Domain.Models.Departamento", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("DataAtualizacao")
                        .HasColumnType("datetime");

                    b.Property<DateTime>("DataInsercao")
                        .HasColumnType("datetime");

                    b.Property<int?>("IdUsuarioResponsavel");

                    b.Property<string>("Nome")
                        .IsRequired()
                        .HasColumnType("varchar(50)");

                    b.HasKey("Id");

                    b.HasIndex("IdUsuarioResponsavel");

                    b.ToTable("Departamento");
                });

            modelBuilder.Entity("Ouvidoria.Domain.Models.Manifestacao", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("DataAtualizacao")
                        .HasColumnType("datetime");

                    b.Property<DateTime>("DataInsercao")
                        .HasColumnType("datetime");

                    b.Property<string>("Descricao")
                        .IsRequired()
                        .HasColumnType("varchar(5000)");

                    b.Property<int>("IdDepartamento");

                    b.Property<int>("IdUsuario");

                    b.Property<string>("Resposta")
                        .HasColumnType("varchar(5000)");

                    b.Property<int>("TipoManifestacao");

                    b.Property<string>("Titulo")
                        .IsRequired()
                        .HasColumnType("varchar(150)");

                    b.HasKey("Id");

                    b.HasIndex("IdDepartamento");

                    b.HasIndex("IdUsuario");

                    b.ToTable("Manifestacao");
                });

            modelBuilder.Entity("Ouvidoria.Domain.Models.Opcao", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("DataAtualizacao")
                        .HasColumnType("datetime");

                    b.Property<DateTime>("DataInsercao")
                        .HasColumnType("datetime");

                    b.Property<string>("Descricao")
                        .IsRequired()
                        .HasColumnType("varchar(1000)");

                    b.Property<int>("IdPergunta");

                    b.HasKey("Id");

                    b.HasIndex("IdPergunta");

                    b.ToTable("Opcao");
                });

            modelBuilder.Entity("Ouvidoria.Domain.Models.Pergunta", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("DataAtualizacao")
                        .HasColumnType("datetime");

                    b.Property<DateTime>("DataInsercao")
                        .HasColumnType("datetime");

                    b.Property<string>("Descricao")
                        .IsRequired()
                        .HasColumnType("varchar(5000)");

                    b.Property<int>("IdQuestionario");

                    b.Property<int>("Tipo");

                    b.HasKey("Id");

                    b.HasIndex("IdQuestionario");

                    b.ToTable("Pergunta");
                });

            modelBuilder.Entity("Ouvidoria.Domain.Models.Questionario", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("DataAtualizacao")
                        .HasColumnType("datetime");

                    b.Property<DateTime>("DataFim")
                        .HasColumnType("datetime");

                    b.Property<DateTime>("DataInicio")
                        .HasColumnType("datetime");

                    b.Property<DateTime>("DataInsercao")
                        .HasColumnType("datetime");

                    b.Property<string>("Descricao")
                        .IsRequired()
                        .HasColumnType("varchar(5000)");

                    b.Property<int>("IdUsuarioCriador");

                    b.Property<string>("Titulo")
                        .IsRequired()
                        .HasColumnType("varchar(100)");

                    b.HasKey("Id");

                    b.HasIndex("IdUsuarioCriador");

                    b.ToTable("Questionario");
                });

            modelBuilder.Entity("Ouvidoria.Domain.Models.QuestionarioResposta", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("DataAtualizacao")
                        .HasColumnType("datetime");

                    b.Property<DateTime>("DataInsercao")
                        .HasColumnType("datetime");

                    b.Property<int>("IdQuestionario");

                    b.Property<int>("IdUsuario");

                    b.HasKey("Id");

                    b.HasIndex("IdQuestionario");

                    b.HasIndex("IdUsuario");

                    b.ToTable("QuestionarioResposta");
                });

            modelBuilder.Entity("Ouvidoria.Domain.Models.Resposta", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("DataAtualizacao")
                        .HasColumnType("datetime");

                    b.Property<DateTime>("DataInsercao")
                        .HasColumnType("datetime");

                    b.Property<int?>("IdOpcao");

                    b.Property<int>("IdPergunta");

                    b.Property<int>("IdQuestionarioResposta");

                    b.Property<string>("Retorno")
                        .HasColumnType("varchar(50)");

                    b.HasKey("Id");

                    b.HasIndex("IdOpcao");

                    b.HasIndex("IdPergunta");

                    b.HasIndex("IdQuestionarioResposta");

                    b.ToTable("Resposta");
                });

            modelBuilder.Entity("Ouvidoria.Domain.Models.Usuario", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<bool>("Ativo");

                    b.Property<string>("CPF")
                        .IsRequired()
                        .HasColumnType("varchar(11)");

                    b.Property<int?>("CursoId");

                    b.Property<DateTime>("DataAtualizacao")
                        .HasColumnType("datetime");

                    b.Property<DateTime>("DataInsercao")
                        .HasColumnType("datetime");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("varchar(100)");

                    b.Property<int?>("IdCurso");

                    b.Property<string>("Nome")
                        .IsRequired()
                        .HasColumnType("varchar(100)");

                    b.Property<string>("Senha")
                        .IsRequired()
                        .HasColumnType("varchar(1000)");

                    b.Property<string>("Telefone")
                        .HasColumnType("varchar(15)");

                    b.Property<int>("UsuarioPerfil");

                    b.HasKey("Id");

                    b.HasIndex("CursoId");

                    b.ToTable("Usuario");
                });

            modelBuilder.Entity("Ouvidoria.Domain.Models.Departamento", b =>
                {
                    b.HasOne("Ouvidoria.Domain.Models.Usuario", "Usuario")
                        .WithMany("Departamento")
                        .HasForeignKey("IdUsuarioResponsavel");
                });

            modelBuilder.Entity("Ouvidoria.Domain.Models.Manifestacao", b =>
                {
                    b.HasOne("Ouvidoria.Domain.Models.Departamento", "Departamento")
                        .WithMany("Manifestacoes")
                        .HasForeignKey("IdDepartamento");

                    b.HasOne("Ouvidoria.Domain.Models.Usuario", "Usuario")
                        .WithMany("Manifestacoes")
                        .HasForeignKey("IdUsuario");
                });

            modelBuilder.Entity("Ouvidoria.Domain.Models.Opcao", b =>
                {
                    b.HasOne("Ouvidoria.Domain.Models.Pergunta", "Pergunta")
                        .WithMany("Opcoes")
                        .HasForeignKey("IdPergunta");
                });

            modelBuilder.Entity("Ouvidoria.Domain.Models.Pergunta", b =>
                {
                    b.HasOne("Ouvidoria.Domain.Models.Questionario", "Questionario")
                        .WithMany("Pergunta")
                        .HasForeignKey("IdQuestionario");
                });

            modelBuilder.Entity("Ouvidoria.Domain.Models.Questionario", b =>
                {
                    b.HasOne("Ouvidoria.Domain.Models.Usuario", "Usuario")
                        .WithMany("Questionarios")
                        .HasForeignKey("IdUsuarioCriador");
                });

            modelBuilder.Entity("Ouvidoria.Domain.Models.QuestionarioResposta", b =>
                {
                    b.HasOne("Ouvidoria.Domain.Models.Questionario", "Questionario")
                        .WithMany("QuestionarioResposta")
                        .HasForeignKey("IdQuestionario");

                    b.HasOne("Ouvidoria.Domain.Models.Usuario", "Usuario")
                        .WithMany("QuestionarioResposta")
                        .HasForeignKey("IdUsuario");
                });

            modelBuilder.Entity("Ouvidoria.Domain.Models.Resposta", b =>
                {
                    b.HasOne("Ouvidoria.Domain.Models.Opcao", "Opcao")
                        .WithMany("Respostas")
                        .HasForeignKey("IdOpcao");

                    b.HasOne("Ouvidoria.Domain.Models.Pergunta", "Pergunta")
                        .WithMany("Respostas")
                        .HasForeignKey("IdPergunta");

                    b.HasOne("Ouvidoria.Domain.Models.QuestionarioResposta", "QuestionarioResposta")
                        .WithMany("Resposta")
                        .HasForeignKey("IdQuestionarioResposta");
                });

            modelBuilder.Entity("Ouvidoria.Domain.Models.Usuario", b =>
                {
                    b.HasOne("Ouvidoria.Domain.Models.Curso", "Curso")
                        .WithMany()
                        .HasForeignKey("CursoId");
                });
#pragma warning restore 612, 618
        }
    }
}
