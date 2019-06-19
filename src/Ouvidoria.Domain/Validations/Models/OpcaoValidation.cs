using FluentValidation;
using Ouvidoria.Domain.Models;

namespace Ouvidoria.Domain.Validations.Models
{
    public class OpcaoValidation<T> : AbstractValidator<T> where T : Opcao
    {
        protected void ValidateDescription()
        {
            RuleFor(d => d.Descricao)
                .NotEmpty().WithMessage("Por favor, preencha a descrição")
                .Length(2, 1000).WithMessage("A descrição deve conter entre 2 e 1000 caracteres");
        }
        
    }
}