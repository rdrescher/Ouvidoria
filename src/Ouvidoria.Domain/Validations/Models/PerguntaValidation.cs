using FluentValidation;
using Ouvidoria.Domain.Enums;
using Ouvidoria.Domain.Models;

namespace Ouvidoria.Domain.Validations.Models
{
    public class PerguntaValidation : AbstractValidator<Pergunta>
    {
        public PerguntaValidation()
        {
            RuleFor(p => p.Descricao)
                .NotEmpty().WithMessage("A descrição é obrigatória")
                .Length(2, 5000).WithMessage("A descrição deve conter entre 2 e 5000 caracteres");

            RuleFor(p => (p.Tipo == TipoPergunta.Objetiva && (p.Opcoes != null && p.Opcoes.Count > 1)) 
                          || p.Tipo == TipoPergunta.Dissertativa && (p.Opcoes == null || p.Opcoes.Count == 0))
                .Equal(true)
                .WithMessage("As perguntas dissertativas não devem conter opções e as objetivas devem ter ao menos duas opções");
        }
    }
}