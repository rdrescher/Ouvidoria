using FluentValidation;
using Ouvidoria.Domain.Enums;
using Ouvidoria.Domain.Models;

namespace Ouvidoria.Domain.Validations.Models
{
    public class InteracaoValidation : AbstractValidator<Interacao>
    {
        public InteracaoValidation()
        {
            RuleFor(p => p.Descricao)
                .NotEmpty().WithMessage("A descrição é obrigatória")
                .Length(2, 5000).WithMessage("A descrição deve conter entre 2 e 5000 caracteres");

            RuleFor(p => p.IdManifestacao)
                .NotEmpty().WithMessage("Manifestação inválida")
                .NotNull().WithMessage("Manifestação inválida");
            
            RuleFor(p => p.IdUsuario)
                .NotEmpty().WithMessage("Usuário inválido")
                .NotNull().WithMessage("Usuário inválido");
        }
    }
}