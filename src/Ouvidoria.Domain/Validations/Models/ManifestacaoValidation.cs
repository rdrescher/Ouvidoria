using FluentValidation;
using Ouvidoria.Domain.Models;

namespace Ouvidoria.Domain.Validations.Models
{
    public abstract class ManifestacaoValidation<T> : AbstractValidator<T> where T : Manifestacao
    {
        protected void ValidateTitulo()
        {
            RuleFor(m => m.Titulo)
                .NotEmpty().WithMessage("Por favor, preencha o título")
                .Length(2, 150).WithMessage("O título deve conter entre 2 e 50 caracteres");
        }

        protected void ValidateDescription()
        {
            RuleFor(m => m.Descricao)
                .NotEmpty().WithMessage("Preencha a descrição")
                .Length(10, 5000).WithMessage("A descrição deve conter entre 10 e 5000 caracteres");
        }

        protected void ValidateAnswer()
        {
            RuleFor(m => m.Resposta)
                .MaximumLength(5000).WithMessage("A resposta deve conter no máximo 5000 caracteres");
        }

        protected void ValidateType()
        {
            RuleFor(m => m.TipoManifestacao)
                .NotEmpty().WithMessage("Selecione o tipo da manifestação");
        }

        protected void ValidateUser()
        {
            RuleFor(m => m.IdUsuario)
                .NotEmpty().WithMessage("Usuário inválido");
        }

        protected void ValidateDepartment()
        {
            RuleFor(m => m.IdDepartamento)
                .NotEmpty().WithMessage("Selecione o departamento");
        }
    }
}