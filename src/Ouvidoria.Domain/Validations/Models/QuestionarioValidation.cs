using System;
using FluentValidation;
using Ouvidoria.Domain.Models;

namespace Ouvidoria.Domain.Validations.Models
{
    public class QuestionarioValidation : AbstractValidator<Questionario>
    {
        public QuestionarioValidation()
        {
            RuleFor(q => q.Titulo)
                .NotEmpty().WithMessage("O título é obrigatório")
                .Length(2, 100).WithMessage("O título deve conter entre 2 e 100 caracteres");

            RuleFor(q => q.Descricao)
                .NotEmpty().WithMessage("A descrição é obrigatória")
                .Length(2, 5000).WithMessage("A descrição deve conter entre 2 e 5000 caracteres");

            RuleFor(q => ValidatePeriod(q.DataInicio, q.DataFim)).Equal(true)
                .WithMessage("A data inicial deve ser menor que a data final.");

            RuleFor(q => q.Perguntas != null || q.Perguntas.Count > 0).Equal(true)
                .WithMessage("O questionário deve conter ao menos uma pergunta.");
        }

        private bool ValidatePeriod(DateTime startDate, DateTime endDate) =>
            startDate < endDate;

    }
}