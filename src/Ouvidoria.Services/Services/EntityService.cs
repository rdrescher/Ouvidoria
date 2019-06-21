using FluentValidation;
using FluentValidation.Results;
using Ouvidoria.Domain.Interfaces;
using Ouvidoria.Domain.Models;
using Ouvidoria.Domain.Notificacoes;
using Ouvidoria.Services.Interfaces;

namespace Ouvidoria.Services
{
    public abstract class EntityService
    {
        private readonly INotificador _notificador;

        protected EntityService(INotificador notificador)
        {
            _notificador = notificador;
        }

        protected void Notify(ValidationResult validationResult)
        {
            foreach (var error in validationResult.Errors)
            {
                Notify(error.ErrorMessage);
            }
        }

        protected void Notify(string mensagem)
        {
            _notificador.Handle(new Notificacao(mensagem));
        }

        protected bool Validate<TV, TE>(TV validacao, TE entidade) where TV : AbstractValidator<TE> where TE : Entity
        {
            var validator = validacao.Validate(entidade);

            if (validator.IsValid) return true;

            Notify(validator);

            return false;
        }
    }
}