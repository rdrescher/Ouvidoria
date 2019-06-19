using FluentValidation;
using Ouvidoria.Domain.Models;

namespace Ouvidoria.Domain.Validations.Models
{
    public class QuestionarioValidation<T> : AbstractValidator<T> where T : Questionario
    {
        protected void ValidateTitle()
        {
            RuleFor(d => d.Titulo)
                .NotEmpty().WithMessage("Por favor, preencha o título")
                .Length(2, 100).WithMessage("O título deve conter entre 2 e 100 caracteres");
        }
        protected void ValidateDescription()
        {
            RuleFor(d => d.Descricao)
                .NotEmpty().WithMessage("Por favor, preencha a descrição")
                .Length(2, 1000).WithMessage("A descrição deve conter entre 2 e 1000 caracteres");
        }
    }
}