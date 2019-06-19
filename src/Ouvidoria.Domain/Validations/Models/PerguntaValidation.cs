using FluentValidation;
using Ouvidoria.Domain.Models;

namespace Ouvidoria.Domain.Validations.Models
{
    public class PerguntaValidation : AbstractValidator<Pergunta>
    {
        public PerguntaValidation()
        {
            RuleFor(p => p.Descricao)
                .NotEmpty().WithMessage("Por favor, preencha a descrição")
                .Length(2, 5000).WithMessage("A descrição deve conter entre 2 e 5000 caracteres");
        }
    }
}