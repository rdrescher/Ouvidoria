using FluentValidation;
using Ouvidoria.Domain.Enums;
using Ouvidoria.Domain.Models;

namespace Ouvidoria.Domain.Validations.Models
{
    public class RespostaValidation : AbstractValidator<Resposta>
    {
        public RespostaValidation(TipoPergunta tipo)
        {
            if (tipo == TipoPergunta.Dissertativa)
            {
                RuleFor(r => r.Retorno)
                    .Length(2, 5000).WithMessage("A resposta deve conter entre 2 e 5000 caracteres");

                RuleFor(r => r.IdOpcao)
                    .Null().WithMessage("A opção deve ser nula para respotas de perguntas dissertativas");

            }
            else if (tipo == TipoPergunta.Objetiva)
            {
                RuleFor(r => r.Retorno)
                    .Empty().WithMessage("O retorno deve ser vazio para respostas de perguntas objetivas");

                RuleFor(r => r.IdOpcao)
                    .NotNull().WithMessage("Respostas de perguntas objetivas devem ter uma opção")
                    .NotEmpty().WithMessage("Respostas de perguntas objetivas devem ter uma opção");
            }

            RuleFor(r => r.IdPergunta)
                .NotEmpty().WithMessage("Pergunta Inválida");
        }
    }
}
