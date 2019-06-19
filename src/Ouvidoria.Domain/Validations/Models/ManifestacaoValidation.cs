using FluentValidation;
using Ouvidoria.Domain.Models;

namespace Ouvidoria.Domain.Validations.Models
{
    public abstract class ManifestacaoValidation : AbstractValidator<Manifestacao>
    {
        public ManifestacaoValidation()
        {
            RuleFor(m => m.Titulo)
                .NotEmpty().WithMessage("Por favor, preencha o título")
                .Length(2, 150).WithMessage("O título deve conter entre 2 e 50 caracteres");

            RuleFor(m => m.Descricao)
                .NotEmpty().WithMessage("Preencha a descrição")
                .Length(10, 5000).WithMessage("A descrição deve conter entre 10 e 5000 caracteres");

            RuleFor(m => m.Resposta)
                .MaximumLength(5000).WithMessage("A resposta deve conter no máximo 5000 caracteres");

            RuleFor(m => m.TipoManifestacao)
                .NotNull().WithMessage("Selecione o tipo da manifestação");

            RuleFor(m => m.IdUsuario)
                .NotNull().WithMessage("Usuário inválido");

            RuleFor(m => m.IdDepartamento)
                .NotNull().WithMessage("Selecione o departamento");

        }
    }
}