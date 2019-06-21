using FluentValidation;
using Ouvidoria.Domain.Models;

namespace Ouvidoria.Domain.Validations.Models
{
    public class QuestionarioRespostaValidation : AbstractValidator<QuestionarioResposta>
    {
        public QuestionarioRespostaValidation()
        {
            RuleFor(q => q.IdQuestionario)
                .NotNull().WithMessage("Questionário Invalido");

            RuleFor(q => q.IdUsuario)
                .NotNull().WithMessage("Usuário inválido");
        }
    }
}