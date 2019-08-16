using Microsoft.EntityFrameworkCore.Migrations;

namespace Ouvidoria.Infrastructure.Migrations
{
    public partial class AjustesUsuarioCurso : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Usuario_Curso_CursoId",
                table: "Usuario");

            migrationBuilder.DropIndex(
                name: "IX_Usuario_CursoId",
                table: "Usuario");

            migrationBuilder.DropColumn(
                name: "CursoId",
                table: "Usuario");

            migrationBuilder.CreateIndex(
                name: "IX_Usuario_IdCurso",
                table: "Usuario",
                column: "IdCurso");

            migrationBuilder.AddForeignKey(
                name: "FK_Usuario_Curso_IdCurso",
                table: "Usuario",
                column: "IdCurso",
                principalTable: "Curso",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Usuario_Curso_IdCurso",
                table: "Usuario");

            migrationBuilder.DropIndex(
                name: "IX_Usuario_IdCurso",
                table: "Usuario");

            migrationBuilder.AddColumn<int>(
                name: "CursoId",
                table: "Usuario",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Usuario_CursoId",
                table: "Usuario",
                column: "CursoId");

            migrationBuilder.AddForeignKey(
                name: "FK_Usuario_Curso_CursoId",
                table: "Usuario",
                column: "CursoId",
                principalTable: "Curso",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
