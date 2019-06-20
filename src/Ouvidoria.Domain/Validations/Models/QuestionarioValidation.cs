using FluentValidation;
using Ouvidoria.Domain.Models;

namespace Ouvidoria.Domain.Validations.Models
{
    public class QuestionarioValidation : AbstractValidator<Questionario>
    {
        public QuestionarioValidation()
        {
            RuleFor(q => q.Titulo)
                .NotEmpty().WithMessage("Por favor, preencha o título")
                .Length(2, 100).WithMessage("O título deve conter entre 2 e 100 caracteres");

            RuleFor(q => q.Descricao)
                .NotEmpty().WithMessage("Por favor, preencha a descrição")
                .Length(2, 5000).WithMessage("A descrição deve conter entre 2 e 5000 caracteres");
        }
    }
}