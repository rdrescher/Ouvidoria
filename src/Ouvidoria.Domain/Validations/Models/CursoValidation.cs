using FluentValidation;
using Ouvidoria.Domain.Models;

namespace Ouvidoria.Domain.Validations.Models
{
    public class CursoValidation: AbstractValidator<Curso>
    {
        public CursoValidation()
        {
            RuleFor(c => c.Nome)
                .NotEmpty().WithMessage("Por favor, preencha o nome do curso")
                .Length(2, 50).WithMessage("O nome do curso deve conter entre 2 e 50 caracteres");
        }
    }
}