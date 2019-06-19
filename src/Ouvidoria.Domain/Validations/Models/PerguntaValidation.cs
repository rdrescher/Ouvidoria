using FluentValidation;
using Ouvidoria.Domain.Models;

namespace Ouvidoria.Domain.Validations.Models
{
    public class PerguntaValidation<T> : AbstractValidator<T> where T : Pergunta
    {
        protected void ValidateDescription()
        {
            RuleFor(d => d.Descricao)
                .NotEmpty().WithMessage("Por favor, preencha a descrição")
                .Length(2, 5000).WithMessage("A descrição deve conter entre 2 e 5000 caracteres");
        }
    }
}