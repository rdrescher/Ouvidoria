using FluentValidation;
using Ouvidoria.Domain.Models;

namespace Ouvidoria.Domain.Validations.Models
{
    public abstract class DepartamentoValidation<T> : AbstractValidator<T> where T : Departamento
    {
        protected void ValidateName()
        {
            RuleFor(d => d.Nome)
                .NotEmpty().WithMessage("Por favor, preencha o nome do departamento")
                .Length(2, 150).WithMessage("O nome do departamento deve conter entre 2 e 50 caracteres");
        }
    }
}