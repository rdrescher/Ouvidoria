﻿using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Ouvidoria.Infrastructure.Migrations
{
    public partial class Init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Curso",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    DataAtualizacao = table.Column<DateTime>(type: "datetime", nullable: false),
                    DataInsercao = table.Column<DateTime>(type: "datetime", nullable: false),
                    Nome = table.Column<string>(type: "varchar(50)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Curso", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Usuario",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    DataAtualizacao = table.Column<DateTime>(type: "datetime", nullable: false),
                    DataInsercao = table.Column<DateTime>(type: "datetime", nullable: false),
                    Nome = table.Column<string>(type: "varchar(100)", nullable: false),
                    Email = table.Column<string>(type: "varchar(100)", nullable: false),
                    Telefone = table.Column<string>(type: "varchar(15)", nullable: true),
                    CPF = table.Column<string>(type: "varchar(11)", nullable: false),
                    Senha = table.Column<string>(type: "varchar(1000)", nullable: false),
                    Ativo = table.Column<bool>(nullable: false),
                    IdCurso = table.Column<int>(nullable: true),
                    UsuarioPerfil = table.Column<int>(nullable: false),
                    CursoId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Usuario", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Usuario_Curso_CursoId",
                        column: x => x.CursoId,
                        principalTable: "Curso",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Departamento",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    DataAtualizacao = table.Column<DateTime>(type: "datetime", nullable: false),
                    DataInsercao = table.Column<DateTime>(type: "datetime", nullable: false),
                    Nome = table.Column<string>(type: "varchar(50)", nullable: false),
                    IdUsuarioResponsavel = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Departamento", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Departamento_Usuario_IdUsuarioResponsavel",
                        column: x => x.IdUsuarioResponsavel,
                        principalTable: "Usuario",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Questionario",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    DataAtualizacao = table.Column<DateTime>(type: "datetime", nullable: false),
                    DataInsercao = table.Column<DateTime>(type: "datetime", nullable: false),
                    Titulo = table.Column<string>(type: "varchar(100)", nullable: false),
                    Descricao = table.Column<string>(type: "varchar(5000)", nullable: false),
                    DataInicio = table.Column<DateTime>(type: "datetime", nullable: false),
                    DataFim = table.Column<DateTime>(type: "datetime", nullable: false),
                    IdUsuarioCriador = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Questionario", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Questionario_Usuario_IdUsuarioCriador",
                        column: x => x.IdUsuarioCriador,
                        principalTable: "Usuario",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Manifestacao",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    DataAtualizacao = table.Column<DateTime>(type: "datetime", nullable: false),
                    DataInsercao = table.Column<DateTime>(type: "datetime", nullable: false),
                    Titulo = table.Column<string>(type: "varchar(150)", nullable: false),
                    Descricao = table.Column<string>(type: "varchar(5000)", nullable: false),
                    Resposta = table.Column<string>(type: "varchar(5000)", nullable: true),
                    IdDepartamento = table.Column<int>(nullable: false),
                    IdUsuario = table.Column<int>(nullable: false),
                    TipoManifestacao = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Manifestacao", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Manifestacao_Departamento_IdDepartamento",
                        column: x => x.IdDepartamento,
                        principalTable: "Departamento",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Manifestacao_Usuario_IdUsuario",
                        column: x => x.IdUsuario,
                        principalTable: "Usuario",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Pergunta",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    DataAtualizacao = table.Column<DateTime>(type: "datetime", nullable: false),
                    DataInsercao = table.Column<DateTime>(type: "datetime", nullable: false),
                    Descricao = table.Column<string>(type: "varchar(5000)", nullable: false),
                    Tipo = table.Column<int>(nullable: false),
                    IdQuestionario = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Pergunta", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Pergunta_Questionario_IdQuestionario",
                        column: x => x.IdQuestionario,
                        principalTable: "Questionario",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "QuestionarioResposta",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    DataAtualizacao = table.Column<DateTime>(type: "datetime", nullable: false),
                    DataInsercao = table.Column<DateTime>(type: "datetime", nullable: false),
                    IdQuestionario = table.Column<int>(nullable: false),
                    IdUsuario = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_QuestionarioResposta", x => x.Id);
                    table.ForeignKey(
                        name: "FK_QuestionarioResposta_Questionario_IdQuestionario",
                        column: x => x.IdQuestionario,
                        principalTable: "Questionario",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_QuestionarioResposta_Usuario_IdUsuario",
                        column: x => x.IdUsuario,
                        principalTable: "Usuario",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Opcao",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    DataAtualizacao = table.Column<DateTime>(type: "datetime", nullable: false),
                    DataInsercao = table.Column<DateTime>(type: "datetime", nullable: false),
                    Descricao = table.Column<string>(type: "varchar(1000)", nullable: false),
                    IdPergunta = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Opcao", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Opcao_Pergunta_IdPergunta",
                        column: x => x.IdPergunta,
                        principalTable: "Pergunta",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Resposta",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    DataAtualizacao = table.Column<DateTime>(type: "datetime", nullable: false),
                    DataInsercao = table.Column<DateTime>(type: "datetime", nullable: false),
                    Retorno = table.Column<string>(type: "varchar(50)", nullable: true),
                    IdOpcao = table.Column<int>(nullable: true),
                    IdPergunta = table.Column<int>(nullable: false),
                    IdQuestionarioResposta = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Resposta", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Resposta_Opcao_IdOpcao",
                        column: x => x.IdOpcao,
                        principalTable: "Opcao",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Resposta_Pergunta_IdPergunta",
                        column: x => x.IdPergunta,
                        principalTable: "Pergunta",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Resposta_QuestionarioResposta_IdQuestionarioResposta",
                        column: x => x.IdQuestionarioResposta,
                        principalTable: "QuestionarioResposta",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Departamento_IdUsuarioResponsavel",
                table: "Departamento",
                column: "IdUsuarioResponsavel");

            migrationBuilder.CreateIndex(
                name: "IX_Manifestacao_IdDepartamento",
                table: "Manifestacao",
                column: "IdDepartamento");

            migrationBuilder.CreateIndex(
                name: "IX_Manifestacao_IdUsuario",
                table: "Manifestacao",
                column: "IdUsuario");

            migrationBuilder.CreateIndex(
                name: "IX_Opcao_IdPergunta",
                table: "Opcao",
                column: "IdPergunta");

            migrationBuilder.CreateIndex(
                name: "IX_Pergunta_IdQuestionario",
                table: "Pergunta",
                column: "IdQuestionario");

            migrationBuilder.CreateIndex(
                name: "IX_Questionario_IdUsuarioCriador",
                table: "Questionario",
                column: "IdUsuarioCriador");

            migrationBuilder.CreateIndex(
                name: "IX_QuestionarioResposta_IdQuestionario",
                table: "QuestionarioResposta",
                column: "IdQuestionario");

            migrationBuilder.CreateIndex(
                name: "IX_QuestionarioResposta_IdUsuario",
                table: "QuestionarioResposta",
                column: "IdUsuario");

            migrationBuilder.CreateIndex(
                name: "IX_Resposta_IdOpcao",
                table: "Resposta",
                column: "IdOpcao");

            migrationBuilder.CreateIndex(
                name: "IX_Resposta_IdPergunta",
                table: "Resposta",
                column: "IdPergunta");

            migrationBuilder.CreateIndex(
                name: "IX_Resposta_IdQuestionarioResposta",
                table: "Resposta",
                column: "IdQuestionarioResposta");

            migrationBuilder.CreateIndex(
                name: "IX_Usuario_CursoId",
                table: "Usuario",
                column: "CursoId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Manifestacao");

            migrationBuilder.DropTable(
                name: "Resposta");

            migrationBuilder.DropTable(
                name: "Departamento");

            migrationBuilder.DropTable(
                name: "Opcao");

            migrationBuilder.DropTable(
                name: "QuestionarioResposta");

            migrationBuilder.DropTable(
                name: "Pergunta");

            migrationBuilder.DropTable(
                name: "Questionario");

            migrationBuilder.DropTable(
                name: "Usuario");

            migrationBuilder.DropTable(
                name: "Curso");
        }
    }
}
