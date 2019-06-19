using FluentValidation;
using Ouvidoria.Domain.Models;

namespace Ouvidoria.Domain.Validations.Models
{
    class RespostaValidation : AbstractValidator<Resposta>
    {
        public RespostaValidation()
        {
            RuleFor(r => r.Retorno)
                .Length(2, 5000).WithMessage("A resposta deve conter entre 2 e 5000 caracteres");

            RuleFor(r => r.IdPergunta)
                .NotEmpty().WithMessage("Pergunta Inválida");
        }
    }
}
