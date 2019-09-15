using FluentValidation;
using Ouvidoria.Domain.Models;

namespace Ouvidoria.Domain.Validations.Models
{
    public class ManifestacaoValidation : AbstractValidator<Manifestacao>
    {
        public ManifestacaoValidation()
        {
            RuleFor(m => m.Titulo)
                .NotEmpty().WithMessage("O título é obrigatório")
                .Length(2, 150).WithMessage("O título deve conter entre 2 e 150 caracteres");

            RuleFor(m => m.Descricao)
                .NotEmpty().WithMessage("A descrição é obrigatória")
                .Length(10, 5000).WithMessage("A descrição deve conter entre 10 e 5000 caracteres");

            RuleFor(m => m.Resposta)
                .MaximumLength(5000).WithMessage("A resposta deve conter no máximo 5000 caracteres");

            RuleFor(m => m.TipoManifestacao)
                .IsInEnum().WithMessage("Tipo da manifestação inválido")
                .NotNull().WithMessage("Informe o tipo da manifestação");

            RuleFor(m => m.IdUsuario)
                .NotNull().WithMessage("Usuário inválido");

            RuleFor(m => m.IdDepartamento)
                .NotEmpty().WithMessage("Informe o departamento")
                .NotNull().WithMessage("Informe o departamento");

        }
    }
}